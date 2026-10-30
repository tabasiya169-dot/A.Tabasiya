#list slicing#

numbers=[10,20,30,40,50,60,70,80,90]
#original list#
print(numbers)

#positive index 1 to 3#
print(numbers[1:4])

#numbers from index 4#
print(numbers[4:])

#Reverse numbers#
print(numbers[::-1])

print(numbers[1::2])




#tuples slicing#

elements=(10,20,30,40,50,60)
print(elements)
print("first 4 elements:",elements[:4])
print("Positive Index:",elements[3])

print("Negative Index:",elements[-1])

print("Last 2 Elements:", elements[-2:])

print("Reverse Tuple:",elements[::-1])


#string slicing#

text = "PYTHON PROGRAMMING"

print("Original String:", text)
print("Every 2nd Character:", text[::2])
print("Characters from 2 to 8:", text[2:8])
print("Characters from 2 to 8 with Step 2:", text[2:8:2])
print("Reverse String:", text[::-1])
