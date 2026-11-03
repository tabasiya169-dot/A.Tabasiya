

#no parameter and no return
def result():
    mark=int(input("Entr the mark"))
    if mark>=25:
       print("pass")
    else:
       print("fail")
result()


#with parameter and no return
def result(mark):
    if mark>=25:
        print("pass")
    else:
        print("fail")
mark=int(input("Enter the mark"))
result(mark)

       
#with parameter and with return
def result(mark):
    if mark >= 25:
        return "Pass"
    else:
        return "Fail"

mark = int(input("Enter your mark: "))
output = result(mark)

print(output)

 
#no parameter and with return
def result():
    mark = int(input("Enter your mark: "))

    if mark >= 25:
        return "Pass"
    else:
        return "Fail"

output = result()

print(output)
