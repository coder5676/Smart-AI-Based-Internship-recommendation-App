import { Text,View,TouchableOpacity,Image,ScrollView} from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

export default function Skilllearn({setopenskillenhance,appliedJobs=[]}){
const missingSkills = appliedJobs
    .flatMap((job) => job.missing_skills || [])
    .filter((skill, index, self) => self.indexOf(skill) === index);
const material={
  "Python": {
    "study": "https://www.geeksforgeeks.org/python-programming-language/",
    "quiz": "https://www.geeksforgeeks.org/python-quiz/"
  },
  "SQL": {
    "study": "https://www.geeksforgeeks.org/sql-tutorial/",
    "quiz": "https://www.geeksforgeeks.org/sql-quiz/"
  },
  "Excel": {
    "study": "https://www.geeksforgeeks.org/microsoft-excel-tutorial/",
    "quiz": "https://www.geeksforgeeks.org/microsoft-excel-quiz/"
  },
  "Tableau": {
    "study": "https://www.simplilearn.com/tutorials/tableau-tutorial/what-is-tableau",
    "quiz": "https://www.proprofs.com/quiz-school/story.php?title=tableau-quiz"
  },
  "ASR": {
    "study": "https://www.sciencedirect.com/topics/computer-science/automatic-speech-recognition",
    "quiz": "https://www.proprofs.com/quiz-school/topic/speech-recognition"
  },
  "Audio Processing": {
    "study": "https://www.geeksforgeeks.org/audio-signal-processing-in-python/",
    "quiz": "https://www.classmarker.com/online-test/start/?quiz=yp65b0b2c68e964c"
  },
  "Pandas": {
    "study": "https://www.geeksforgeeks.org/pandas-tutorial/",
    "quiz": "https://www.geeksforgeeks.org/pandas-quiz/"
  },
  "NumPy": {
    "study": "https://www.geeksforgeeks.org/numpy-tutorial/",
    "quiz": "https://www.geeksforgeeks.org/numpy-quiz/"
  },
  "Scikit-learn": {
    "study": "https://scikit-learn.org/stable/user_guide.html",
    "quiz": "https://www.geeksforgeeks.org/machine-learning-quiz/"
  },
  "Docker": {
    "study": "https://www.geeksforgeeks.org/docker-tutorial/",
    "quiz": "https://www.geeksforgeeks.org/docker-quiz/"
  },
  "CI/CD": {
    "study": "https://www.geeksforgeeks.org/ci-cd/",
    "quiz": "https://www.sanfoundry.com/continuous-integration-continuous-delivery-questions-answers/"
  },
  "MLflow": {
    "study": "https://mlflow.org/docs/latest/index.html",
    "quiz": "https://www.quizerry.com/quiz/mlops-practice-test/"
  },
  "Transformers": {
    "study": "https://huggingface.co/docs/transformers/index",
    "quiz": "https://www.proprofs.com/quiz-school/story.php?title=transformers"
  },
  "spaCy": {
    "study": "https://spacy.io/usage",
    "quiz": "https://www.proprofs.com/quiz-school/story.php?title=spacy"
  },
  "NLTK": {
    "study": "https://www.nltk.org/",
    "quiz": "https://www.proprofs.com/quiz-school/story.php?title=nltk"
  },
  "OpenCV": {
    "study": "https://www.geeksforgeeks.org/opencv-python-tutorial/",
    "quiz": "https://www.geeksforgeeks.org/opencv-quiz/"
  },
  "PyTorch": {
    "study": "https://pytorch.org/tutorials/",
    "quiz": "https://www.geeksforgeeks.org/pytorch-quiz/"
  },
  "TensorFlow": {
    "study": "https://www.tensorflow.org/tutorials",
    "quiz": "https://www.geeksforgeeks.org/tensorflow-quiz/"
  },
  "Flask": {
    "study": "https://www.geeksforgeeks.org/flask-tutorial/",
    "quiz": "https://www.proprofs.com/quiz-school/story.php?title=flask-framework"
  },
  "REST APIs": {
    "study": "https://www.geeksforgeeks.org/rest-api-introduction/",
    "quiz": "https://www.proprofs.com/quiz-school/story.php?title=rest-api"
  },
  "PostgreSQL": {
    "study": "https://www.geeksforgeeks.org/postgresql-tutorial/",
    "quiz": "https://www.geeksforgeeks.org/postgresql-quiz/"
  },
  "Airflow": {
    "study": "https://airflow.apache.org/docs/",
    "quiz": "https://www.proprofs.com/quiz-school/story.php?title=airflow"
  },
  "ETL": {
    "study": "https://www.geeksforgeeks.org/what-is-etl/",
    "quiz": "https://www.proprofs.com/quiz-school/story.php?title=etl"
  },
  "RLlib": {
    "study": "https://docs.ray.io/en/latest/rllib/index.html",
    "quiz": "https://www.proprofs.com/quiz-school/story.php?title=reinforcement-learning"
  },
  "ARIMA": {
    "study": "https://www.geeksforgeeks.org/arima-model-in-python/",
    "quiz": "https://www.proprofs.com/quiz-school/story.php?title=time-series"
  },
  "Prophet": {
    "study": "https://facebook.github.io/prophet/docs/quick_start.html",
    "quiz": "https://www.proprofs.com/quiz-school/story.php?title=time-series"
  },
  "LLMs": {
    "study": "https://www.geeksforgeeks.org/large-language-models-llms/",
    "quiz": "https://www.proprofs.com/quiz-school/story.php?title=language-models"
  },
  "Prompt Design": {
    "study": "https://learnprompting.org/",
    "quiz": "https://www.proprofs.com/quiz-school/story.php?title=prompt-engineering"
  }
}
const mappedSkills = missingSkills.map((skill) => ({
    name: skill,
    material: material[skill]?.material || null,
    quiz: material[skill]?.quiz || null,
  }));

    return(<>
    <View style={{width:"100%",height:"100%",display:"flex",backgroundColor:"white",position:"absolute",zIndex:16,left:0,top:0}}>
<TouchableOpacity style={{marginTop:50,padding:15,backgroundColor:"whitesmoke",borderRadius:100,alignSelf:"flex-start",marginLeft:10}} onPress={()=>setopenskillenhance(false)}>
<Entypo name="cross" size={27} color="black" />

        </TouchableOpacity>
        <Text style={{fontFamily:"lexend",padding:15,backgroundColor:"mediumspringgreen",fontSize:20,width:200,textAlign:"center",borderRadius:100,marginLeft:20,marginTop:20}}>Enhance Skills</Text>
        <Text style={{fontFamily:"lexend",fontSize:20,color:"grey",margin:20}}>These materials will help you coplete gaps in your skills for your applied jobs.</Text>
        <Text style={{fontFamily:"lexend",fontSize:30,color:"black",margin:20}}>Learn and explore</Text>

 <ScrollView style={{ marginTop: 10 }}>
        {mappedSkills.length === 0 ? (
          <Text style={{ fontSize: 18, color: "gray" }}>
            🎉 No missing skills! You’re all set.
          </Text>
        ) : (
          mappedSkills.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "white",
                padding: 15,
                borderRadius: 12,
                marginBottom: 15,
              }}
            >
              {/* Skill Name */}
              <Text
                style={{
                  fontSize: 20,
                  fontFamily:"lexend",
                  padding:15,
                  backgroundColor:"whitesmoke",
                  width:230,
                  textAlign:"center",
                  borderRadius:300,
                  marginBottom: 12,
                }}
              >
                {item.name}
              </Text>

              {/* Two Buttons in a Card */}
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    marginRight: 5,
                    backgroundColor: "#007bff",
                    padding: 12,
                    borderRadius: 8,
                    alignItems: "center",
                  }}
                  onPress={() => item.material && Linking.openURL(item.material)}
                >
                  <Text style={{ color: "white", fontSize: 20,fontFamily:"lexend" }}>Material</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flex: 1,
                    marginLeft: 5,
                    backgroundColor: "mediumspringgreen",
                    padding: 12,
                    borderRadius: 8,
                    alignItems: "center",
                  }}
                  onPress={() => item.quiz && Linking.openURL(item.quiz)}
                >
                  <Text style={{ color: "black", fontSize: 20,fontFamily:"lexend" }}>Quizzes</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>

    </>)

}