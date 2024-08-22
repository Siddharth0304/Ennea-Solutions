//Menu class to store the items present in the restaurant
//Menu items are stored in map where id is key of the food item using which user can order food, the value is a Pair class, containing the variables type,price and item name to define the item 

import java.util.*;
class Pair{
    String item;
    String type;
    int price;
    public Pair(String item,int price,String type){
        this.type=type; //to keep a track of type of the food item
        this.item=item; //name of the item
        this.price=price; //price of the item
    }
}
public class Menu {
    HashMap<Integer,Pair> all=new HashMap<>();

    public Menu(){
        all.put(1,new Pair("Chicken Biryani",265,"rice"));
        all.put(2,new Pair("Mutton Biryani",400,"rice"));
        all.put(3,new Pair("Egg Fried Rice",200,"rice"));
        all.put(4,new Pair("Veg Biryani",180,"rice"));
        all.put(5,new Pair("Paneer Biryani",240,"rice"));

        all.put(6,new Pair("Shahi Paneer",300,"curry"));
        all.put(7,new Pair("Kadai Veg",220,"curry"));
        all.put(8,new Pair("Butter Chicken",330,"curry"));
        all.put(9,new Pair("Mutton Rogan Josh",390,"curry"));
        all.put(10,new Pair("Dal Makhni",240,"curry"));

        all.put(11,new Pair("Pulka Roti",10,"bread"));
        all.put(12,new Pair("Naan",15,"bread"));
        all.put(13,new Pair("Butter Naan",25,"bread"));
        all.put(14,new Pair("Garlic Butter Naan",35,"bread"));

        all.put(15,new Pair("Coca Cola",80,"drinks"));
        all.put(16,new Pair("Fresh Lime Soda",80,"drinks"));
        all.put(17,new Pair("Mint Mojito",120,"drinks"));
        all.put(18,new Pair("Chocolate Milkshake",100,"drinks"));

        all.put(19,new Pair("Apricot Delight",130,"desserts"));
        all.put(20,new Pair("Qubani Ka Meetha",110,"desserts"));
        all.put(21,new Pair("Fruit Salad",140,"desserts"));
        all.put(22,new Pair("Rasmalai",180,"desserts"));
        all.put(23,new Pair("Paan Shot Ice Cream",130,"desserts"));





    }
    
}
