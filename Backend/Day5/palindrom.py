num =int(input("enter the number"))
s=0
temp=num

while num>0:
    r=num%10
    s=s+r
    if num>9:
        s=s*10
    num=num//10

if(temp == s):
    print("palindrom")
else:
    print("not plaindrom")
