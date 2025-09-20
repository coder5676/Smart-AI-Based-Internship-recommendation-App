from flask import Flask,jsonify,request;
import io
import pdfplumber
import re
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import requests
from spacy.matcher import PhraseMatcher
app=Flask(__name__)

def getresumetext(driveurl):
    match = re.search(r'/d/([a-zA-Z0-9_-]+)', driveurl)
    if(match):
        fileid=match.group(1)
        downloadurl=f"https://drive.google.com/uc?export=download&id={fileid}"
    else:
        downloadurl=driveurl
    response=requests.get(downloadurl)
    if(response.status_code!=200):
        raise Exception("Failed to download")
    return response.content


def readpdf(pdfbytes):
    text=""
    with pdfplumber.open(io.BytesIO(pdfbytes)) as pdf:
        for page in pdf.pages:
            pagetext=page.extract_text()
            if pagetext:
                text+=pagetext+"\n"
    return text.strip()            

# Code to extract skills and match with job skills required 
nlp=spacy.load("en_core_web_sm")
known_skills = [
    # Programming Languages
    "python", "java", "c", "c++", "c#", "javascript", "typescript",
    "go", "rust", "ruby", "php", "kotlin", "swift", "r", "matlab",

    # Web Development
    "html", "css", "react", "angular", "vue", "node", "express",
    "django", "flask", "spring", "next.js", "tailwind","node.js","express.js",

    # Databases
    "sql", "mysql", "postgresql", "mongodb", "oracle", "redis",
    "firebase", "cassandra",

    # Data Science & AI
    "machine learning", "deep learning", "artificial intelligence",
    "statistics", "pandas", "numpy", "scikit-learn", "tensorflow",
    "keras", "pytorch", "nlp", "computer vision", "data analysis",
    "data visualization", "matplotlib", "seaborn", "powerbi",
    "tableau",

    # Cloud & DevOps
    "aws", "azure", "gcp", "docker", "kubernetes", "jenkins",
    "github actions", "terraform", "ci/cd", "linux", "bash",
    "shell scripting",

    # Mobile Development
    "android", "ios", "react native", "flutter", "xamarin",

    # Cybersecurity
    "network security", "penetration testing", "vulnerability assessment",
    "ethical hacking", "cryptography", "firewalls", "wireshark",
    "nmap", "metasploit",

    # Tools & Misc
    "git", "github", "gitlab", "jira", "confluence", "agile",
    "scrum", "excel", "latex",

    # Soft Skills
    "communication", "teamwork", "leadership", "problem solving",
    "critical thinking", "creativity", "adaptability", "time management"
]

matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
patterns = [nlp(skill) for skill in known_skills]
matcher.add("Skills", patterns)
def normalize(skill: str) -> str:
    """
    Normalize skill names to avoid duplicates like 'node', 'Node.js', 'nodejs'.
    """
    return (
        skill.lower()
        .replace(".js", "")   # remove .js suffix
        .replace("js", "")    # handle 'nodejs'
        .strip()
    )
def extractSkills(resumetext: str):
    """
    Extract known skills from resume text by checking against the known_skills list.
    """
    
    # Normalize both known skills and resume text
    text_lower = resumetext.lower()
    found_skills = []
    for skill in known_skills:
        if skill in text_lower:
            found_skills.append(normalize(skill))
    
    return list(set(found_skills))  # unique skills only

def matchResumeToJobs(resumetext, jobs):
    # Extract + normalize resume skills
    skills_resume = [normalize(s) for s in extractSkills(resumetext)]
    resume_skills_set = set(skills_resume)

    results = []
    for job in jobs:
        job_skills_set = set([normalize(s) for s in job["Skills required"]])
        
        # Missing skills (set difference)
        missing = list(job_skills_set - resume_skills_set)
        
        if not missing:
            match_score = 100.0   # ✅ perfect match if nothing is missing
        else:
            # Percentage based on overlap
            overlap = len(job_skills_set & resume_skills_set)
            match_score = round((overlap / len(job_skills_set)) * 100, 2)

        results.append({
            "job_title": job["title"],
            "thumbnail":job["thumbnailurl"],
            "createdat":job["createdat"],
            "applicants":job["applicants"],
            "id":job["id"],
            "location":job["location"],
            "company":job["company"],
            "description":job["description"],
            "domain":job["domain"],
            "description":job["description"],
            "duration":job["duration"],
            "reference":job["reference"],
            "stipend":job["salary"],
            "skills":job["Skills required"],
            "match_score": match_score,
            "missing_skills": missing,
        })
    
    return sorted(results, key=lambda x: x["match_score"], reverse=True)

@app.route("/")
def home():
    return "ML flask server is running"

@app.route("/match",methods=["POST"])
def match():
    data=request.json
    resumeurl=data.get("resumeurl")
    jobs=data.get("jobs")
  
    if not jobs or not isinstance(jobs, list):
        return jsonify({"error": "jobs must be a list of job objects"}), 400
    if not resumeurl:
        return jsonify({"error": "resumeurl is required"}), 400
    try:
        resumebytes=getresumetext(resumeurl)
        resumetext=readpdf(resumebytes)
     
        matches=matchResumeToJobs(resumetext,jobs)
        return jsonify(matches)
    except Exception as e:
        return jsonify({"error":str(e)}),500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
    

