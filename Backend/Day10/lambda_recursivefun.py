
#1. Lambda function

result = lambda a: "even number" if a % 2 == 0 else "odd number"

print(result(10))
print(result(5))
print(result(50))
print(result(23))



#2. Recursive function

def sum_num(number):
    
    if number==0:
        return 0
    else:
        result= number+sum_num(number-1)
        return result
print( sum_num(10))
