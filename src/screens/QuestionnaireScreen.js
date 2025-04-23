import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { fetchQuestions } from '../api/user';
import { submitUserHealthInfo } from '../api/user';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Modal } from 'react-native';
const QuestionnaireScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (error) {
        console.error('Асуултуудыг авахад алдаа:', error);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  // const handleAnswerChange = (questionId, value) => {
  //   setAnswers(prev => ({ ...prev, [questionId]: value }));
  // };
  const handleAnswerChange = (questionId, value, multiSelect = false) => {
    setAnswers(prev => {
      if (multiSelect) {
        const current = prev[questionId] || [];
        if (current.includes(value)) {
          // already selected → remove it
          return { ...prev, [questionId]: current.filter(v => v !== value) };
        } else {
          // add to selection
          return { ...prev, [questionId]: [...current, value] };
        }
      } else {
        return { ...prev, [questionId]: value };
      }
    });
  };
  const isMultiSelect = (q) =>
    q.questionText === "Та ямар нэгэн хоолны харшилтай юу?" ||
    q.questionText === "Танд дараах өвчнүүдээс оношлогдож байсан уу?";
  
  

  const { userInfo } = useContext(AuthContext); // userId авах
  const [showSuccessModal, setShowSuccessModal] = useState(false);
const [modalData, setModalData] = useState({ calories: 0, water: 0 });

const handleNext = async () => {
  const currentQ = questions[currentIndex];
  const answer = answers[currentQ.id];

  if (!answer || answer === '') {
    Alert.alert("Анхаар!", "Энэ асуултад заавал хариу өгөх шаардлагатай.");
    return;
  }

  if (currentIndex < questions.length - 1) {
    setCurrentIndex(currentIndex + 1);
  } else {
    try {
      const payload = buildHealthInfoPayload(userInfo.id, questions, answers);
      const response = await submitUserHealthInfo(payload);
      console.log("response: ", response)
      setModalData({
        calories: response.calories,
        water: response.waterIntake
      });
      setShowSuccessModal(true);

      // Alert.alert(
      //   "Амжилттай!",
      //   `Таны мэдээлэлд үндэслэн хоолны төлөвлөгөө амжилттай үүслээ.\n\nӨдөрт авах илчлэгийн хэмжээ: ${response.calories} ккал\nУух усны хэмжээ: ${response.waterIntake} мл`,
      //   [
      //     {
      //       text: "OK",
      //       onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Main' }] })
      //     }
      //   ]
      // );
      // Alert.alert("Амжилттай", "Таны мэдээлэл амжилттай хадгалагдлаа!");
      // navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    } catch (err) {
      console.error('Хадгалах үед алдаа:', err);
      Alert.alert("Алдаа", "Мэдээлэл илгээх үед алдаа гарлаа.");
    }
  }
};


  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (questions.length === 0) return <Text>Асуулт олдсонгүй.</Text>;

  const currentQuestion = questions[currentIndex];

  const buildHealthInfoPayload = (userId, questions, answers) => {
    let payload = {
      userId,
      gender: '',
      birthDate: '',
      height: 0,
      weight: 0,
      targetWeight: 0,
      lifestyle: '',
      allergies:[],
      diseases:[],
      questions: []
    };
  
    questions.forEach(q => {
      const ans = answers[q.id];
  
      switch (q.questionText) {
        case "Таны хүйс юу вэ?":
          payload.gender = ans === q.answers.find(a => a.answerText === 'Эмэгтэй')?.id ? 'female' : 'male';
          break;
        case "Таны төрсөн өдөр":
          payload.birthDate = ans; break;
        case "Таны өндөр хэд вэ?":
          payload.height = parseFloat(ans); break;
        case "Таны жин хэд вэ?":
          payload.weight = parseFloat(ans); break;
        case "Таны зорилтот жин хэд вэ?":
          payload.targetWeight = parseFloat(ans); break;
        case "Таны хөдөлгөөний түвшин ямар вэ?":
          payload.lifestyle = mapLifestyle(ans, q); break;
        // case "Та ямар нэгэн хоолны харшилтай юу?":
        //   const allergyName = q.answers.find(a => a.id === ans)?.answerText;
        //   payload.allergies = allergyName ? allergyName : '';
        //   break;
        
        // case "Танд дараах өвчнүүдээс оношлогдож байсан уу?":
        //   const diseaseName = q.answers.find(a => a.id === ans)?.answerText;
        //   payload.diseases = diseaseName ? diseaseName : '';
        //   break;
        case "Та ямар нэгэн хоолны харшилтай юу?":
        if (Array.isArray(ans)) {
          payload.allergies = ans.map(answerId => {
            const answerText = q.answers.find(a => a.id === answerId)?.answerText;
            return answerText ? { name: answerText } : null;
          }).filter(Boolean); // remove nulls
        }
        break;

      case "Танд дараах өвчнүүдээс оношлогдож байсан уу?":
        if (Array.isArray(ans)) {
          payload.diseases = ans.map(answerId => {
            const answerText = q.answers.find(a => a.id === answerId)?.answerText;
            return answerText ? { name: answerText } : null;
          }).filter(Boolean); // remove nulls
        }
        break;

          
            // if (Array.isArray(ans)) {
            //   ans.forEach(answerId => {
            //     const allergyName = q.answers.find(a => a.id === answerId)?.answerText;
            //     if (allergyName) payload.allergies.push({ name: allergyName });
            //   });
            // } else {
            //   const allergyName = q.answers.find(a => a.id === ans)?.answerText;
            //   if (allergyName) payload.allergies.push({ name: allergyName });
            // }
            
        default:
          payload.questions.push({ questionId: q.id });
          break;
      }
    });
  
    return payload;
  };
  
  const mapLifestyle = (answerId, question) => {
    const text = question.answers.find(a => a.id === answerId)?.answerText;
    switch (text) {
      case 'Хөдөлгөөн багатай': return 'SEDENTARY';
      case 'Бага зэрэг идэвхтэй': return 'LIGHT';
      case 'Дунд зэрэгийн идэвхтэй': return 'MODERATE';
      case 'Идэвхтэй': return 'ACTIVE';
      case 'Маш идэвхтэй': return 'VERY_ACTIVE';
      default: return 'MODERATE';
    }
  };
  
  return (
    <View style={styles.container}>
      <Modal
  animationType="fade"
  transparent={true}
  visible={showSuccessModal}
  onRequestClose={() => setShowSuccessModal(false)}
>
  <View style={styles.modalBackdrop}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Амжилттай!</Text>
      <Text style={styles.modalText}>
        Таны мэдээлэлд үндэслэн хоолны төлөвлөгөө амжилттай үүслээ.
      </Text>
      <Text style={styles.modalHighlight}>
        Өдөрт авах илчлэгийн хэмжээ: {modalData.calories} ккал
      </Text>
      <Text style={styles.modalHighlight}>
        Уух усны хэмжээ: {modalData.water} мл
      </Text>
      <TouchableOpacity
  onPress={() => {
    setShowSuccessModal(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
    // navigation.replace('Main');

  }}
  style={styles.modalButton}
>
  <Text style={styles.modalButtonText}>OK</Text>
</TouchableOpacity>

    </View>
  </View>
</Modal>

      {/* Дээд хэсэг: category, progress bar */}
      <Text style={styles.categoryText}>
        {currentQuestion.category === 'GENERAL' && 'Ерөнхий Мэдээлэл'}
        {currentQuestion.category === 'HEALTH_CONDITION' && 'Эрүүл Мэндийн Мэдээлэл'}
        {currentQuestion.category === 'LIFESTYLE' && 'Амьдралын Хэв Маяг'}
      </Text>
      <View style={styles.progressBarContainer}>
        <View
          style={[styles.progressBar, { width: `${((currentIndex + 1) / questions.length) * 100}%` }]}
        />
      </View>

      {/* Асуулт */}
      <Text style={styles.questionText}>{currentQuestion.questionText}</Text>

      {/* Хариултууд */}
      {currentQuestion.type === 'TEXT' ? (
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleAnswerChange(currentQuestion.id, text)}
          value={answers[currentQuestion.id] || ''}
          placeholder="Хариултаа бичнэ үү..."
        />
      ) : (
        currentQuestion.answers.map(answer => {
          const isMulti = isMultiSelect(currentQuestion);
          const selectedAnswers = answers[currentQuestion.id] || [];
          const isSelected = isMulti
            ? selectedAnswers.includes(answer.id)
            : answers[currentQuestion.id] === answer.id;
        
          return (
            <TouchableOpacity
              key={answer.id}
              style={[styles.choiceBox, isSelected && styles.choiceBoxSelected]}
              onPress={() => handleAnswerChange(currentQuestion.id, answer.id, isMulti)}
            >
              <View style={styles.radioCircle}>
                {isSelected && <View style={styles.selectedDot} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.choiceMainText}>{answer.answerText}</Text>
                {answer.description && <Text style={styles.choiceSubText}>{answer.description}</Text>}
              </View>
            </TouchableOpacity>
          );
        })
        
      )}

      {/* Доорх navigation товчууд - тогтвортой байрлалтай */}
      <View style={styles.bottomButtons}>
        {currentIndex > 0 && (
          <TouchableOpacity onPress={handlePrevious} style={styles.prevButton}>
            <Text style={styles.buttonText}>Өмнөх</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.buttonText}>
            {currentIndex < questions.length - 1 ? 'Дараах' : 'Дуусгах'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuestionnaireScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C274C',
    textAlign: 'center',
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#D9D9D9',
    borderRadius: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#50B86C',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  choiceBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  choiceBoxSelected: {
    borderColor: '#50B86C',
    backgroundColor: '#E6F6ED',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#50B86C',
    marginRight: 12,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#50B86C',
  },
  choiceMainText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  choiceSubText: {
    fontSize: 13,
    color: '#6D7074',
    marginTop: 4,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    marginBottom: 30,
  },
  prevButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#ccc',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#50B86C',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },


  // modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#50B86C',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  modalHighlight: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1B1C1E',
    marginBottom: 6,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#50B86C',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
  
});
