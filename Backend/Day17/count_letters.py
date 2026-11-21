
#write a code to find no of occurances of each character in the given word "aaaabbcccddddffffff"

word="aaaabbcccddddffffff"
count={}

for i in word:
    if i in count:
        count[i]+=1
    else:
        count[i]=1
        
for i in count:
    print(i,"=",count[i])
        
        
