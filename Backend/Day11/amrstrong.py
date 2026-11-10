
#armstrong number
'''
num=1

while (num<=1000):
    temp=num
    s=0

    while( temp>0):
        r= temp%10
        s= s+r**3
        temp= temp//10

    if( s==num):
        print(num)
    num= num+1
        '''

#palindrom number

num=1

while (num<=1000):
    temp=num
    s=0

    while (temp>0):
        r = temp%10
        s = s*10+r
        temp=temp//10

    if s==num:
        print(num)
        
    num=num+1
    
