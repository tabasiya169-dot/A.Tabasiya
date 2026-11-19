
#write a code to implement multi level inheritance
class shopping:
    def shop_details(self):
        print("Welcome to flipcard")
    def product_details(self):
        print("Product: Watch")
    def payment_method(self):
        print("Category: Online")

class product( shopping):
     
    def delivery_details(self):
        print("Deliver in 5 days")
    def Warranty_details(self):
        print("Warranty for 1 year")
         
class  customer(product):
    def Customer_details(self):
        print("Customer:sameera")
    def order_details(self):
        print("order conformed")


obj = customer()
obj.shop_details()
obj.product_details()
obj.payment_method()
obj.delivery_details()
obj.Warranty_details()
obj.Customer_details()
obj.order_details()




#write a code to implement multiple inheritance

class Doctor:
    def doctor_name(self):
        print("Doctor: fousiya")
    def specialization(self):
        print("Specialization: Cardiologist")

class Disease:
    def disease_name(self):
        print("Disease: Heart Problem")
    def symptoms(self):
        print("Symptoms: Chest Pain")
    def treatment(self):
        print("Treatment: Medical Checkup")

class Patient(Doctor, Disease):
    def patient_name(self):
        print("Patient: sameera")
    def patient_age(self):
        print("Age: 28")
    def room_number(self):
        print("Room Number: 108")

obj = Patient()
obj.doctor_name()
obj.specialization()
obj.disease_name()
obj.symptoms()
obj.treatment()
obj.patient_name()
obj.patient_age()
obj.room_number()
