

#create user defined exception class


class LoginException(Exception):
    pass

try:
    password = input("enter the password: ")

    if password != "tabas@321":
        raise LoginException("Invalid Password")

    else:
        print("Login Successfully")

except LoginException as ex:
    print(ex)
