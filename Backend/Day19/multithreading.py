

#implement multithreading using any custom requiements:

import time
import threading

def train_status():
    count = 1
    while count <= 3:
        print("Train Status: Chennai Express is running")
        time.sleep(3)
        count += 1

def passenger_details():
    count = 1
    while count <= 3:
        print("Passenger 1: Tabasiya")
        print("Passenger 2: Sameera")
        time.sleep(1)
        count += 1

def ticket_details():
    time.sleep(4)
    print("Passenger 1: Tabasiya - Ticket Confirmed")
    print("Passenger 2: Sameera - Ticket Confirmed")
    print("Ticket Booking Completed")

m1 = threading.Thread(target=train_status)
m2 = threading.Thread(target=passenger_details)
m3 = threading.Thread(target=ticket_details)

m1.start()
m2.start()
m3.start()
