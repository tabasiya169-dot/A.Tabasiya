fruit = input("Enter a fruit: ")

match fruit.lower():
    case "apple":
        print("Red fruit")
    case "banana":
        print("Yellow fruit")
    case "orange":
        print("Orange fruit")
    case _:
        print("Unknown fruit")
