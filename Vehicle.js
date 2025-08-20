package OOPSProject;
import java.util.Scanner;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.InputMismatchException;

class Customer {
    String name;
    String address;
    String DOB;
    long id;
    int twoWheelerRentTime = 0;
    int fourWheelerRentTime = 0;
    long twoWheelerRent = 0;
    long fourWheelerRent = 0;

    Customer() {
    }

    Customer(String name, String address, String DOB, long id) {
        this.name = name;
        this.address = address;
        this.DOB = DOB;
        this.id = id;
    }

    void customerRegistration(ArrayList<Customer> customers) {
        try {
            Scanner sc = new Scanner(System.in);
            System.out.println(ConsoleColors.PURPLE + "\n🔵 Enter Customer Registration Details 🔵" + ConsoleColors.RESET);
            System.out.print("👤 Name: ");
            this.name = sc.nextLine();
            System.out.println("🏠 Enter Address:");
            System.out.print("🏢 Apartment: ");
            String apartName = sc.nextLine();
            System.out.print("🛣 Road: ");
            String roadName = sc.nextLine();
            System.out.print("🌆 City: ");
            String cityName = sc.nextLine();
            this.address = apartName + " Apartment, " + roadName + " Road, " + cityName;
            System.out.print("🎂 Date of Birth (dd mm yyyy): ");
            int day = sc.nextInt();
            int month = sc.nextInt();
            int year = sc.nextInt();
            sc.nextLine();
            this.DOB = day + "/" + month + "/" + year;
            System.out.print("🆔 Customer ID: ");
            long ID = sc.nextLong();
            boolean found = false;
            for (int i = 0; i < customers.size(); i++) {
                while (ID == customers.get(i).id) {
                    found = true;
                    System.out.print("Customer is already registered with this id...Please enter another ID..\n");
                    ID = sc.nextInt();
                }
            }
            if (!found) {
                this.id = ID;
            }

            Customer C = new Customer(name, address, DOB, ID);
            customers.add(C);
            System.out.println(ConsoleColors.GREEN + "✅ Customer successfully registered!\n" + ConsoleColors.RESET);
        } catch (InputMismatchException e) {
            System.out.println(ConsoleColors.RED + "❌ Error: Input type is mismatched" + ConsoleColors.RESET);
        }
    }

    void Display(ArrayList<Customer> customers) {
        System.out.println(ConsoleColors.YELLOW + "\n📋 All Registered Customers:" + ConsoleColors.RESET);
        for (Customer c : customers) {
            System.out.println("------------------------------");
            System.out.println("👤 Name: " + c.name);
            System.out.println("🎂 DOB: " + c.DOB);
            System.out.println("🆔 ID: " + c.id);
            System.out.println("📍 Address: " + c.address);
        }
    }

    void searchCustomer(ArrayList<Customer> customers) {
        Scanner sc = new Scanner(System.in);
        long ID = 0;
        try {
            System.out.print("🔍 Enter Customer ID to search: ");
            ID = sc.nextLong();
        } catch (InputMismatchException e) {
            System.out.println(ConsoleColors.RED + "❌ Error: Input type is mismatched" + ConsoleColors.RESET);
        }
        boolean found = false;
        for (Customer c : customers) {
            if (ID == c.id) {
                found = true;
                System.out.println(ConsoleColors.GREEN + "✅ Customer Found:" + ConsoleColors.RESET);
                System.out.println("👤 Name: " + c.name);
                System.out.println("🎂 DOB: " + c.DOB);
                System.out.println("🆔 ID: " + c.id);
                System.out.println("📍 Address: " + c.address);
                break;
            }
        }
        if (!found) {
            System.out.println(ConsoleColors.RED + "❌ Customer not found!" + ConsoleColors.RESET);
        }
    }

    void RentalHistory(ArrayList<Customer> customers) {
        Scanner sc = new Scanner(System.in);
        int id = 0;
        try {
            System.out.print("📑 Enter Customer ID to view rental history: ");
            id = sc.nextInt();
        } catch (InputMismatchException e) {
            System.out.println(ConsoleColors.RED + "❌ Error: Input type is mismatched" + ConsoleColors.RESET);
        }
        for (Customer c : customers) {
            if (id == c.id) {
                System.out.println("👤 Name: " + c.name);
                System.out.println("🛵 Two-Wheeler Rentals: " + c.twoWheelerRentTime + " times");
                System.out.println("💸 Two-Wheeler Bill: ₹" + c.twoWheelerRent);
                System.out.println("🚗 Four-Wheeler Rentals: " + c.fourWheelerRentTime + " times");
                System.out.println("💰 Four-Wheeler Bill: ₹" + c.fourWheelerRent);
                System.out.println("🧾 Total Bill: ₹" + (c.twoWheelerRent + c.fourWheelerRent));
                break;
            }
        }
    }
}

abstract class Vehicle {
    String model;
    String fuelType;
    int number;
    boolean isRented = false;
    boolean isFound = false;
    int history = 0;
    Vehicle() {
    }
    Vehicle(String model, String fuelType, int number) {
        this.model = model;
        this.fuelType = fuelType;
        this.number = number;
    }

    int rentToCustomer() {
        Scanner sc = new Scanner(System.in);
        try {
            System.out.print("\uD83D\uDCDA Enter number of hours to rent: ");
            return sc.nextInt();
        } catch (InputMismatchException e) {
            System.out.println("\u274C Error: Input type is mismatched\n");
            return 0;
        }
    }

    void vehicleRegistration(ArrayList<Customer> customers, ArrayList<FourWheeler> fourWheelers,
                             ArrayList<TwoWheeler> twoWheelers) {
        Scanner sc = new Scanner(System.in);
        try {
            System.out.print("\uD83D\uDC64 Enter the ID of the Customer: ");
            int id = sc.nextInt();
            for (int i = 0; i < customers.size(); i++) {
                if (id == customers.get(i).id) {
                    history = i;
                    isFound = true;
                    System.out.print("\uD83D\uDE97 Enter the model of Vehicle: ");
                    sc.nextLine();
                    this.model = sc.nextLine();
                }
            }
        } catch (InputMismatchException e) {
            System.out.println("\u274C Error: Input type is mismatched\n");
        }
        if (!isFound) {
            System.out.print("⚠️ Customer not found. Please register the customer first.\n");
        }
    }
}

class FourWheeler extends Vehicle {
    int capacity;
    FourWheeler() {
        super();
    }
    FourWheeler(String model, String fuelType, int number, int capacity) {
        super(model, fuelType, number);
        this.capacity = capacity;
    }

    void vehicleRegistration(ArrayList<Customer> customers, ArrayList<FourWheeler> fourWheeler,
                             ArrayList<TwoWheeler> twoWheeler) {
        try {
            System.out.println("\n\uD83D\uDE97 Available Four Wheelers:");
            for (int i = 0; i < fourWheeler.size(); i++) {
                System.out.println("\uD83D\uDE97 Model: " + fourWheeler.get(i).model);
                System.out.println(" \uD83D\uDEE3️ Capacity: " + fourWheeler.get(i).capacity);
            }
            Scanner sc = new Scanner(System.in);
            super.vehicleRegistration(customers, fourWheeler, twoWheeler);
            System.out.print("\uD83D\uDEE3️ Enter capacity of Four-Wheeler: ");
            int capacity = sc.nextInt();
            int found = 0;
            int idx = 0;
            for (int i = 0; i < fourWheeler.size(); i++) {
                if (isFound && model.equalsIgnoreCase(fourWheeler.get(i).model)
                        && capacity <= fourWheeler.get(i).capacity && !fourWheeler.get(i).isRented) {
                    found = 1;
                    idx = i;
                    break;
                }
            }
            if (isFound) {
                if (found != 0) {
                    System.out.println("\u2705 Four-Wheeler is available. Proceeding with payment...");
                    fourWheeler.get(idx).isRented = true;
                    int hours = rentToCustomer();
                    double bill = bill(hours);
                    System.out.println("\uD83D\uDCB5 Your bill is: ₹" + bill);
                    customers.get(history).fourWheelerRentTime++;
                    customers.get(history).fourWheelerRent += bill;
                    System.out.println("\uD83D\uDEE3️ Vehicle number: " + fourWheeler.get(idx).number + "\n");
                } else {
                    System.out.println("\u274C No matching four-wheeler is available.");
                }
            }
        } catch (InputMismatchException e) {
            System.out.println("\u274C Error: Input type is mismatched\n");
        }
    }

    double bill(int hours) {
        double rate = 50.0;
        return rate * hours;
    }

    void returnVehicle(ArrayList<FourWheeler> fourWheeler, ArrayList<Customer> customers) {
        Scanner sc = new Scanner(System.in);
        boolean found = false;
        int number = -1;
        try {
            System.out.print("\uD83D\uDD04 Enter the number of Vehicle to return: ");
            number = sc.nextInt();
        } catch (InputMismatchException e) {
            System.out.println("\u274C Error: Input type is mismatched\n");
            return;
        }

        for (int i = 0; i < fourWheeler.size(); i++) {
            if (number == fourWheeler.get(i).number && fourWheeler.get(i).isRented) {
                fourWheeler.get(i).isRented = false;
                found = true;
                System.out.println("\u2705 Four-Wheeler returned successfully.\n");
                break;
            }
        }
        if (!found) {
            System.out.println("⚠️ This Four-Wheeler was not rented out.\n");
        }
    }
}

class TwoWheeler extends Vehicle {
    TwoWheeler() {
        super();
    }

    TwoWheeler(String model, String fuelType, int number) {
        super(model, fuelType, number);
    }

    void vehicleRegistration(ArrayList<Customer> customers, ArrayList<FourWheeler> fourWheeler,
                             ArrayList<TwoWheeler> twoWheeler) {
        System.out.println("\uD83C\uDFCD️ Available Two Wheelers:");
        for (TwoWheeler t : twoWheeler) {
            System.out.println("\tModel: " + t.model);
        }
        super.vehicleRegistration(customers, fourWheeler, twoWheeler);
        boolean vehiclefound = false;
        int idx = 0;
        for (int i = 0; i < twoWheeler.size(); i++) {
            if (isFound && model.equalsIgnoreCase(twoWheeler.get(i).model) && !twoWheeler.get(i).isRented) {
                vehiclefound = true;
                idx = i;
                break;
            }
        }
        if (isFound) {
            if (vehiclefound) {
                System.out.println("\uD83D\uDE97 Vehicle is available! Proceeding with payment...");
                twoWheeler.get(idx).isRented = true;
                int hours = rentToCustomer();
                double bill = bill(hours);
                System.out.println("\uD83D\uDCB3 Your bill is: Rs." + bill);
                customers.get(history).twoWheelerRentTime++;
                customers.get(history).twoWheelerRent += bill;
                System.out.println("\uD83D\uDEE3️ Number of Two Wheeler: " + twoWheeler.get(idx).number);
            } else {
                System.out.println("\u26A0️ No matching Two-Wheeler available.");
            }
        }
    }

    double bill(int hours) {
        double rate = 10.0;
        return rate * hours;
    }

    void returnVehicle(ArrayList<TwoWheeler> twoWheeler, ArrayList<Customer> customers) {
        Scanner sc = new Scanner(System.in);
        boolean found = false;
        int number = -1;
        try {
            System.out.print("\uD83D\uDE97 Enter the number of the Two Wheeler to return: ");
            number = sc.nextInt();
        } catch (InputMismatchException e) {
            System.out.println("\u274C Error: Input type is mismatched\n");
            sc.nextLine(); // Clear invalid input
            return;
        }
        for (int i = 0; i < twoWheeler.size(); i++) {
            if (number == twoWheeler.get(i).number && twoWheeler.get(i).isRented) {
                twoWheeler.get(i).isRented = false;
                found = true;
                System.out.println("\u2705 Two Wheeler successfully returned!\n");
                break;
            }
        }
        if (!found) {
            System.out.println("\u26A0️ Two Wheeler was not rented or number is incorrect.\n");
        }
    }
}


public class vehicle {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        TwoWheeler two = new TwoWheeler();
        FourWheeler four = new FourWheeler();
        Customer C = new Customer();
        ArrayList<Customer> customers = new ArrayList<>();
        ArrayList<TwoWheeler> twoWheeler = new ArrayList<>();
        twoWheeler.add(new TwoWheeler("Honda", "Petrol", 2735));
        twoWheeler.add(new TwoWheeler("Ola", "No fuel", 5512));
        twoWheeler.add(new TwoWheeler("Activa", "Petrol", 5655));
        twoWheeler.add(new TwoWheeler("Jupiter", "Petrol", 6332));
        twoWheeler.add(new TwoWheeler("Access", "Petrol", 8223));
        twoWheeler.add(new TwoWheeler("Splender", "Petrol", 8664));
        twoWheeler.add(new TwoWheeler("Chetak", "No fuel", 1223));
        twoWheeler.add(new TwoWheeler("Aviator", "Petrol", 9888));
        twoWheeler.add(new TwoWheeler("Pleasure", "Petrol", 4422));
        twoWheeler.add(new TwoWheeler("Apache", "Petrol", 7775));
        ArrayList<FourWheeler> fourWheeler = new ArrayList<>();
        fourWheeler.add(new FourWheeler("XUV", "Petrol", 2247, 8));
        fourWheeler.add(new FourWheeler("Toyota", "CNG", 2057, 6));
        fourWheeler.add(new FourWheeler("Creta", "CNG", 2238, 8));
        fourWheeler.add(new FourWheeler("Rumion", "Diesel", 9876, 10));
        fourWheeler.add(new FourWheeler("PunchEV", "Diesel", 2210, 4));
        fourWheeler.add(new FourWheeler("Amaze", "Diesel", 9899, 4));
        fourWheeler.add(new FourWheeler("Scorpio", "Diesel", 7667, 6));
        fourWheeler.add(new FourWheeler("Skoda", "Diesel", 6556, 5));
        fourWheeler.add(new FourWheeler("Thar", "Diesel", 5332, 4));
        fourWheeler.add(new FourWheeler("Mercedes", "CNG", 8899, 4));
        System.out.println(ConsoleColors.RED + "\n‼️‼️‼️ WELCOME TO OUR VEHICLE RENTAL SYSTEM‼️‼️‼️\n" + ConsoleColors.RESET);
        int process = 10;
        do {
            try {
                System.out.println(ConsoleColors.BLUE + "\n--- MENU ---" + ConsoleColors.RESET);
                System.out.println("1. Register a Customer");
                System.out.println("2. Rent a Two-Wheeler");
                System.out.println("3. Rent a Four-Wheeler");
                System.out.println("4. Display All Customer Information");
                System.out.println("5. Search for a Customer");
                System.out.println("6. Return a Two-Wheeler");
                System.out.println("7. Return a Four-Wheeler");
                System.out.println("8. View Rental History of a Customer");
                System.out.println("0. Exit the System");
                process = sc.nextInt();
            } catch (InputMismatchException e) {
                System.out.println("\u274C Error: Input type is mismatched\n");
                sc.nextLine(); // clear invalid input
                continue;
            }
            switch (process) {
                case 1:
                    C.customerRegistration(customers);
                    break;
                case 2:
                    two.vehicleRegistration(customers, fourWheeler, twoWheeler);
                    break;
                case 3:
                    four.vehicleRegistration(customers, fourWheeler, twoWheeler);
                    break;
                case 4:
                    C.Display(customers);
                    break;
                case 5:
                    C.searchCustomer(customers);
                    break;
                case 6:
                    two.returnVehicle(twoWheeler, customers);
                    break;
                case 7:
                    four.returnVehicle(fourWheeler, customers);
                    break;
                case 8:
                    C.RentalHistory(customers);
                    break;
                case 0:
                    System.out.println("\uD83D\uDC4B Thank you for using the Vehicle Rental System! Visit again.");
                    break;
                    default:
                        System.out.println("\u2753 Please enter a valid number.");
            }
        } while (process != 0);
    }
}

class ConsoleColors {
    public static final String RESET = "\u001B[0m";
    public static final String RED = "\u001B[31m";
    public static final String GREEN = "\u001B[32m";
    public static final String YELLOW = "\u001B[33m";
    public static final String BLUE = "\u001B[34m";
    public static final String PURPLE = "\u001B[35m";
}


