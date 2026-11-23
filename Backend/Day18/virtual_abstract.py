#implement virtual and abstract function using any custom requirement:

from abc import ABC,abstractmethod

class Hospital(ABC):
    
    def patient_details(self):  #virtual method
        print("Patient detail")
      
    @abstractmethod
    def treatment_details(self): #abstract method
        pass

class Patient(Hospital):
    
    def  patient_details(self):
        print("Patient Name: archana","Age:30","Patient status: Normal")
        
    def treatment_details(self):
        print("Treatment:Body checkup")

i1= Patient()
i1.patient_details()
i1.treatment_details()
