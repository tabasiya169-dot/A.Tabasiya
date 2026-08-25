let studentList=[{name:"Tabas",mark:98},
                 {name:"Samee",mark:90},
                 {name:"Ruhii",mark:78},

]

let searchName="Samee";
for(let i=0;i<studentList.length;i++){
    if(studentList[i].name===searchName){
        console.log("Name:",studentList[i].name);
         console.log("Mark:",studentList[i].mark);
        
    }


}