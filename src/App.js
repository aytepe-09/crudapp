import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import EditStudentModal from "./components/EditStudentModal";

function App() {
  //Read
  const [students, setStudents] = useState(null); //1

  const [showAddForm, setShowAddForm] = useState(false); //2

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [stdClass, setStdClass] = useState("");

  const [didUpdate, setDidUpdate] = useState(false); //Bunu silme işlemine özel tanımladım, ama aynı zamanda edit de de kullanıcam. Herhangi bir güncelleme olursa
  const [showEditForm, setShowEditForm] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState({
    //Bunu edit işlemi için tanımlıyorum.
    id: "",
    studentNumber: "",
    name: "",
    surname: "",
    class: "",
  });

  const [status, setStatus] = useState("Öğrenci No");
  const [searchText, setSearchText] = useState("");

  const [filtered, setFiltered] = useState("Ada göre");

  


 {/*} var  filteredStudents1 = []

 const handleSirali = (e) => {

  setFiltered(e.target.value)

  axios.get("http://localhost:3004/students")
  .then(res=> {
    
      filteredStudents1= res.data.sort(function (a, b) {
        return a.surname > b.surname ? 1 : -1
      }
      )
           
          
        //condition ları yazamıyorum
          
          setStudents(filteredStudents1)

        })
  .catch(err=>{console.log("muhammed")})
}
*/}

  //CREATE
  const handleSubmit = (e) => {
    e.preventDefault();

    if (number === "" || name === "" || surname === "" || stdClass === "") {
      alert("Bütün alanları doldurmak zorunludur");
      return;
    }
    const hasStudent = students.find((item) => item.studentNumber === number);
    if (hasStudent !== undefined) {
      alert("Bu öğrenci sistemde kayıtlıdır.");
      return; //bunu yazmasaydık alert verse bile kaydetme işlemine devam ederdi.
    }

    const newStudent = {
      id: String(new Date().getTime()),
      studentNumber: number,
      name: name,
      surname: surname,
      class: stdClass,
    };
    //console.log(newStudent)
    axios
      .post("http://localhost:3004/students", newStudent)
      .then((res) => {
        setStudents([...students, newStudent]);
        setShowAddForm(false);
        setNumber("");
        setName("");
        setSurname("");
        setStdClass("");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (studentId) => {
    axios
      .delete(`http://localhost:3004/students/${studentId}`)
      .then((res) => {
        setDidUpdate(!didUpdate);

        /*
     Yukarıdaki methodda, backendde silince dependecny sayesinde otomatik front end de güncellenmiş oldu.
     İkinci yol: 
      const filteredStudents = students.filter( item => item.id !== studentId)
      setStudents(filteredStudents)
     */
      })
      .catch((err) => console.log(err));
  };
  //çalışma şekli: önce constructor,render, useEffect
  /*
constructor kısmında students ilk değeri boş , bu yüzden erken kaçış if ine giriyor.
Sonra use effect e gidiyor. Öğrenci bilgilerini alıyor. Onu aldığı için setStudents ile students in içini dolduruyor.
ilk if'e değil ikinci return e gidiyor.
*/

  const ogrNoSirali = () => {
    axios
      .get("http://localhost:3004/students")
      .then((res) => {
        const sirali = res.data.sort(function (a, b) {
          return a.studentNumber - b.studentNumber;
        });
        setStudents(sirali);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const adSirali = () => {
    axios
      .get("http://localhost:3004/students")
      .then((res) => {
        const sirali = res.data.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        setStudents(sirali);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const soyadSirali = () => {
    axios
      .get("http://localhost:3004/students")
      .then((res) => {
        const sirali = res.data.sort(function (a, b) {
          if (a.surname > b.surname) {
            return 1;
          }
          if (a.surname < b.surname) {
            return -1;
          }
          return 0;
        });
        setStudents(sirali);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sinifSirali = () => {
    axios
      .get("http://localhost:3004/students")
      .then((res) => {
        const sirali = res.data.sort(function (a, b) {
          if (a.class < b.class) {
            return -1;
          }
          if (a.class > b.class) {
            return 1;
          }
          return 0;
        });
        setStudents(sirali);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    axios
      .get("http://localhost:3004/students")
      .then((response) => {
        setTimeout(() => {
          setStudents(response.data);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [didUpdate]);

  useEffect( ()=>{

    if (students !== null) {
      var filteredStudents1 = [];
  switch(filtered) {
    case "Öğrenci noya göre":
      filteredStudents1= students.sort(function (a, b) {
        return  a.studentNumber-b.studentNumber
       });
   
       setStudents(filteredStudents1);
 
      break;
      case "Ada göre":
        filteredStudents1=students.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        setStudents(filteredStudents1);
      break;
      case "Soyadına göre":
        filteredStudents1=students.sort(function (a, b) {
          if (a.surname > b.surname) {
            return 1;
          }
          if (a.surname < b.surname) {
            return -1;
          }
          return 0;
        });
        setStudents(filteredStudents1);
        break;
      case "Sınıfa göre":
        filteredStudents1=students.sort(function (a, b) {
          if (a.class > b.class) {
            return 1;
          }
          if (a.class < b.class) {
            return -1;
          }
          return 0;
        });
        setStudents(filteredStudents1);
        break;
  
        default:
          filteredStudents1=students
           
          break;
      } 

  }
    
  },[filtered])


  if (students === null) {
    return <h1> Loading...</h1>;
  }

 var filteredStudents = [];

  switch (status) {
    case "Öğrenci no":
      filteredStudents = students.filter((item) => {
        return item.studentNumber.includes(searchText);
      });
      break;
    case "Adı":
      filteredStudents = students.filter((item) => {
        return item.name.includes(searchText.toUpperCase());
      });

      break;
    case "Soyadı":
      filteredStudents = students.filter((item) => {
        return item.surname.includes(searchText.toUpperCase());
      });
      break;
    case "Sınıfı":
      filteredStudents = students.filter((item) => {
        return item.class.includes(searchText.toUpperCase());
      });
      break;

    default:
      filteredStudents = students;

      break;
  }

  
  {/*
     var filteredStudents1 = [];

  switch(filtered) {
    case "Öğrenci noya göre":
      filteredStudents1= students.sort(function (a, b) {
        return  a.studentNumber-b.studentNumber
       });
       setStudents(filteredStudents1);
 
      break;
    case "Ada göre":
      filteredStudents1=students.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      setStudents(filteredStudents1);
    break;
    case "Soyadına göre":
      filteredStudents1=students.sort(function (a, b) {
        if (a.surname > b.surname) {
          return 1;
        }
        if (a.surname < b.surname) {
          return -1;
        }
        return 0;
      });
      setStudents(filteredStudents1);
      break;
    case "Sınıfa göre":
      filteredStudents1=students.sort(function (a, b) {
        if (a.class > b.class) {
          return 1;
        }
        if (a.class < b.class) {
          return -1;
        }
        return 0;
      });
      setStudents(filteredStudents1);
      break;

      default:
        filteredStudents1=students
         
        break;
  }
*/}
  
  return (
    <div className="App">
      <nav className="navbar navbar-light bg-primary navbar-dark-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            CRUD APP
          </a>
        </div>
      </nav>

      <div className="container my-5">
        <div className="d-flex justify-content-end">
          <div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ height: "60px", font: "bolder" }}
            >
              <option value="Öğrenci no">Öğrenci numarası</option>
              <option value="Adı">Adı</option>
              <option value="Soyadı">Soyadı</option>
              <option value="Sınıfı">Sınıfı</option>
            </select>
          </div>
          <input
            type="text"
            class="form-control m-75"
            placeholder="Type to search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
            }}
            className="btn btn-primary"
          >
            Öğrenci Ekle
          </button>
        </div>

        <div className="d-flex justify-content-around my-3">
          <button
            onClick={ogrNoSirali}
            style={{
              borderRadius: "5px",
              backgroundColor: "orange",
              padding: "10px",
            }}
          >
            Öğrenci No Sıralı
          </button>
          <button
            onClick={adSirali}
            style={{
              borderRadius: "5px",
              backgroundColor: "orange",
              padding: "10px",
            }}
          >
            Ada Göre Sıralı
          </button>
          <button
            onClick={soyadSirali}
            style={{
              borderRadius: "5px",
              backgroundColor: "orange",
              padding: "10px",
            }}
          >
            Soyadına Göre Sıralı
          </button>
          <button
            onClick={sinifSirali}
            style={{
              borderRadius: "5px",
              backgroundColor: "orange",
              padding: "10px",
            }}
          >
            Sınıfa Göre Sıralı
          </button>
        </div>

          

        {showAddForm === true && (
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label htmlFor="öğrencinumarası" className="form-label">
                Öğrenci Numarası
              </label>
              <input
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
                type="number"
                class="form-control"
                id="öğrencinumarası"
              />
            </div>
            <div class="mb-3">
              <label htmlFor="Adı" className="form-label">
                Adı
              </label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value.toUpperCase());
                }}
                type="text"
                class="form-control"
                id="Adı"
              />
            </div>
            <div class="mb-3">
              <label htmlFor="Soyadı" className="form-label">
                Soyadı
              </label>
              <input
                value={surname}
                onChange={(e) => {
                  setSurname(e.target.value.toUpperCase());
                }}
                type="text"
                class="form-control"
                id="öğrencinumarası"
              />
            </div>
            <div class="mb-3">
              <label htmlFor="Sınıfı" className="form-label">
                Sınıfı
              </label>
              <input
                value={stdClass}
                onChange={(e) => {
                  setStdClass(e.target.value.toUpperCase());
                }}
                type="text"
                class="form-control"
                id="Sınıfı"
              />
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-outline-primary">Kaydet</button>
            </div>
          </form>
        )}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Öğrenci No</th>
              <th scope="col">Adı</th>
              <th scope="col">Soyadı</th>
              <th scope="col">Sınıfı</th>
              <th scope="col">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.studentNumber}</td>
                <td>{student.name}</td>
                <td>{student.surname}</td>
                <td>{student.class}</td>
                <td>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Sil
                  </button>
                  <button
                    onClick={() => {
                      setShowEditForm(true);
                      setSelectedStudent(student);
                    }}
                    className="btn btn-sm btn-secondary"
                  >
                    Düzenle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div> SIRALI LİSTE
          <div>
            <select
            value={filtered}
            onChange={(e)=> {setFiltered(e.target.value)}}
            style={{ height: "60px", font: "bolder" }}
          >
              <option value="Öğrenci noya göre">Öğrenci numarası</option>
              <option value="Ada göre">Adı</option>
              <option value="Soyadına göre">Soyadı</option>
              <option value="Sınıfa göre">Sınıfı</option>
            </select>
          </div>

         
        </div>
      </div>
      
    </div>
  );
}

export default App;
