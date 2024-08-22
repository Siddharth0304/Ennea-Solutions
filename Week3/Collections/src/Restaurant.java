import java.util.*;
import java.util.Map.Entry;


//This class is used to create a object having cost of item and number of times the customer ordered the item in his order
class MenPair{
    int c;
    int cost;
    public MenPair(int cost,int c){
        this.c=c;
        this.cost=cost;
    }
}

public class Restaurant extends Menu{    
    public static void main(String[] args) {
        //Using list to take orders from customer dynamically, list stores the id of the item
        
        List<Integer> list=new ArrayList<>();
        
        Menu menu=new Menu(); 

        //Creating a map cart to store item name,price and number of times item was ordered
        Map<String,MenPair> cart=new HashMap<>();  
        try(Scanner sc=new Scanner(System.in)){
            System.out.println();
            System.out.println("Welcome to Restaurant\n");
            
            int ch;
            do{
                System.out.println("-----------------------------------------------------------------------------\n1.VIEW MENU \t\t 2.ADD ITEMS \n3.BILLING \t\t 4.EXIT");
                System.out.print("CHOOSE AN OPTION BASED ON INDEX : ");
                ch=sc.nextInt();
                switch(ch){
                    case 1: System.out.println("\nOur Mouthwatering Menu!!!");
                            System.out.println("1.Breads");
                            for (Entry<Integer, Pair> me : menu.all.entrySet()) {
                                if(me.getValue().type.equals("bread"))
                                System.out.println("\t("+me.getKey()+")"+me.getValue().item + " : "+me.getValue().price);
                            }
                            System.out.println();
                            System.out.println("2.Curries");
                            for (Entry<Integer, Pair> me : menu.all.entrySet()) {
                                if(me.getValue().type.equals("curry"))
                                System.out.println("\t("+me.getKey()+")"+me.getValue().item + " : "+me.getValue().price);
                            }
                            System.out.println();
                            System.out.println("3.Rice & Biryanis");
                            for (Entry<Integer, Pair> me : menu.all.entrySet()) {
                                if(me.getValue().type.equals("rice"))
                                System.out.println("\t("+me.getKey()+")"+me.getValue().item + " : "+me.getValue().price);
                            }
                            System.out.println();
                            System.out.println("4.Drinks");
                            for (Entry<Integer, Pair> me : menu.all.entrySet()) {
                                if(me.getValue().type.equals("drinks"))
                                System.out.println("\t("+me.getKey()+")"+me.getValue().item + " : "+me.getValue().price);
                            }
                            System.out.println();
                            System.out.println("5.Desserts");
                            for (Entry<Integer, Pair> me : menu.all.entrySet()) {
                                if(me.getValue().type.equals("desserts"))
                                System.out.println("\t("+me.getKey()+")"+me.getValue().item + " : "+me.getValue().price);
                            }
                            System.out.println("\n");
                            break;
                    case 2: System.out.println();
                            int b;
                            do{
                                System.out.println("\n-----------------------------------------------------------------------------------\n1.ADD ITEM TO CART\t\t2.ORDER");
                                System.out.print("CHOOSE FROM ABOVE : ");
                                b=sc.nextInt();
                                switch(b){
                                    case 1: System.out.print("\nGIVE THE ID OF THE ITEM YOU WISH TO ORDER.(NOTE : ID IS GIVEN IN BRACES) : ");
                                            int v=sc.nextInt();
                                            if(v>23){
                                                System.out.println("No item with requested id");
                                                continue;
                                            }
                                
                                            list.add(v);break;
                                    case 2: System.out.println("\nYour order is ready.");break;
                                    default:System.out.println("Invalid Choice");
                                }
                            }
                            while(b!=2);
                            System.out.println();break;      
                            
                    case 3: System.out.println();
                            if(list.size()==0){
                                System.out.println("No Item to Bill\n");break;
                            }
                            double total=0.0f; 

                            // Lambda expression
                            list.forEach(n->{ //We use id in the list to getValue from menu and then store it in the cart.
                            
                            if(cart.containsKey(menu.all.get(n).item)){
                                cart.get(menu.all.get(n).item).c+=1;
                            }
                            else
                                cart.put(menu.all.get(n).item,new MenPair(menu.all.get(n).price,1));
                            });
                            System.out.println("-----------------------------------------------------------------------------\nItem\t\t\tCost\t\t\tCount\t\t\tSubtotal");
                            for(Entry<String,MenPair> e: cart.entrySet()){
                                System.out.println(e.getKey()+"\t\t  "+e.getValue().cost+"\t\t  "+e.getValue().c+"\t\t  "+(e.getValue().cost*e.getValue().c));
                                total+=e.getValue().cost*e.getValue().c;
                            }
                            System.out.println("\t\tTotal : "+total*1.05+" (*Including taxes[5%])");
                            System.out.println();
                            break;
                    case 4: System.out.println("\n------------------------------------------------\nThank You, Have a Good Day!\n------------------------------------------------\n");break;
                    default: System.out.println("Invalid Choice");break;
                }
            }
            while(ch!=4);
        }
        
    }
}
