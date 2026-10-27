row=4
coloumn=7
space=0



for i in range(1,row+1):
    for z in range(1,space+1):
        print("  ",end=" ")

    for j in range(1,coloumn+1):
        print(" * ",end=" ")

    coloumn=coloumn-2
    space=space+1
    print("\n",end="")
