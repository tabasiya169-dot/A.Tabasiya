
#implement decorator for your own requirement


def discount(func):
    def inner():
        print("20% discount")
        func()
    return inner

@discount
def purchase():
    price=2000
    print("final price",price-200)
purchase()
          
#realtime example for decorator


def OrderStatus(func):
    def inner():
        print("Order Placed Successfully")
        func()
        print("Thank You for Ordering")
    return inner

@OrderStatus
def food_order():
    print("Food: Pizza")
    print("Price: 250")

food_order()
