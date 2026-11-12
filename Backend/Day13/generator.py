#implement generator using any custom requirement

#movie ticket price generator:

def movieticket():
    yield 200
    yield 300
    yield 350
    yield 400
    yield 450
    yield 500

tickets = movieticket()

for i in tickets:
    print("Movie ticket price",i)
