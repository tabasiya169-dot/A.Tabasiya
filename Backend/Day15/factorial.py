

#write a code to implement factorial using recursive function

number=int(input("Enter the number"))

def factorial(n):
    if n==0 or n==1:
     return 1
    else :
        return n*factorial(n-1)

if number<0:
    print("negative not allowed")
else:
    print("factorial number ",factorial(number))
