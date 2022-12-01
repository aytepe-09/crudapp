import axios from "axios";
import React, { useState } from "react";
import "../css/EditStudents.css"

function EditStudentModal({ formuEditle,secilmisOgrenci,ogrenciler,setDidUpdate,didUpdate,setStudents}) {

  //console.log(secilmisOgrenci)

  const [stdNumber,setStdNumber] = useState(secilmisOgrenci.studentNumber)
  const [name,setName] = useState(secilmisOgrenci.name)
  const [surname,setSurname] = useState(secilmisOgrenci.surname)
  const [stdClass,setStdClass] = useState(secilmisOgrenci.class)


  const handleEdit = (e)=> {
    e.preventDefault()
    if (stdNumber === "" || name === "" || surname ==="" || stdClass === "") {
      alert("Bütün alanları doldurmak zorunludur")
      return
    }

    //Öğrenci numarasını değiştirmeden kaydet işlemi yapamasın.
    const filteredStudents = ogrenciler.filter(item => item.id !== secilmisOgrenci.id)
    console.log("filtered",filteredStudents)
    const hasStudent = filteredStudents.find(item =>  item.studentNumber === stdNumber)
    console.log("has",hasStudent)
    if (hasStudent !== undefined) {
      alert("Bu numarada öğrenci sistemde zaten kayıtlıdır.")
      return 
    }

    const updatedStudent = {
      ...secilmisOgrenci,
      name:name,
      surname:surname,
      class: stdClass,
      studentNumber:stdNumber
    }
    //Editden sonraski veri tabanına kaydetme işlemi

    axios.put(`http://localhost:3004/students/${secilmisOgrenci.id}`,updatedStudent)
    .then(res=>{
      formuEditle(false)
      //setDidUpdate(!didUpdate)//yani bir güncelleme oldu diyorum. Useeffect tekrar çalışır
      setStudents([...ogrenciler,updatedStudent])
    })
    .catch(err=>{console.log(err)})
  }
  return (
    <div className="ModalMainContainer">
      <div className="ModalContainer">
        <h1>Öğrenci Editleme formu</h1>
        <form onSubmit={handleEdit}
         className="w-75 mx-auto">
          <div class="mb-3">
            <label htmlFor="öğrencinumarası" className="form-label">
              Öğrenci Numarası
            </label>
            <input value={stdNumber} onChange={ (e)=>setStdNumber(e.target.value)}
             type="number" class="form-control" id="öğrencinumarası" />
          </div>
          <div class="mb-3">
            <label htmlFor="Adı" className="form-label">
              Adı
            </label>
            <input value={name} onChange={ (e)=>setName(e.target.value.toUpperCase())}
            type="text" class="form-control" id="Adı" />
          </div>
          <div class="mb-3">
            <label htmlFor="Soyadı" className="form-label">
              Soyadı
            </label>
            <input value={surname} onChange={ (e)=>setSurname(e.target.value.toUpperCase())}
            type="text" class="form-control" id="öğrencinumarası" />
          </div>
          <div class="mb-3">
            <label htmlFor="Sınıfı" className="form-label">
              Sınıfı
            </label>
            <input value={stdClass} onChange={ (e)=>setStdClass(e.target.value.toUpperCase())}
            type="text" class="form-control" id="Sınıfı" />
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-outline-primary">Kaydet</button>
            <button
              onClick={() => {
                formuEditle(false);
              }}
            >
              Kapat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudentModal;
