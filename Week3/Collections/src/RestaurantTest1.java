import java.util.*;
import java.util.Map.Entry;

class RestaurantTest1 {
    
    public static void main(String[] args) {
        // Simulating a static input test case
        Menu menu = new Menu();
        // Test data (Simulating user input)
        List<Integer> testOrder = Arrays.asList(1, 2, 5, 5, 9); // IDs based on your menu
        Map<String, MenPair> expectedCart = new HashMap<>();
        expectedCart.put("Chicken Biryani", new MenPair(265, 1));   // Assuming price is 10
        expectedCart.put("Mutton Biryani", new MenPair(400, 1));   // Assuming price is 15
        expectedCart.put("Paneer Biryani", new MenPair(240, 2)); // Assuming price is 25 each
        expectedCart.put("Mutton Rogan Josh", new MenPair(390, 1));    // Assuming price is 8

        // Fill the cart based on test data
        Map<String, MenPair> actualCart = new HashMap<>();
        testOrder.forEach(n -> {
            if (actualCart.containsKey(menu.all.get(n).item)) {
                actualCart.get(menu.all.get(n).item).c+= 1;
            } else {
                actualCart.put(menu.all.get(n).item, new MenPair(menu.all.get(n).price, 1));
            }
        });

        //Comparing the actual total bill to the expected bill 
        float expectedTotal=1611.75f;
        float actualTotal=getTotal(actualCart);
    
        // Compare the actual cart to the expected cart
        boolean testResult = compareCarts(expectedCart, actualCart);

        // Output test result
        if (testResult && expectedTotal==actualTotal) {
            System.out.println("Test Passed!");
        } else {
            System.out.println("Test Failed!");
            System.out.println("Expected Cart: " + expectedCart);
            System.out.println("Actual Cart: " + actualCart);
            System.out.println("Expected Total : "+expectedTotal);
            System.out.println("Actual Total "+actualTotal);
        }
    }
    

    // Method to compare two carts
    public static boolean compareCarts(Map<String, MenPair> expected, Map<String, MenPair> actual) {
        if (expected.size() != actual.size()) {
            return false;
        }

        for (Map.Entry<String, MenPair> entry : expected.entrySet()) {
            String itemName = entry.getKey();
            MenPair expectedPair = entry.getValue();
            MenPair actualPair = actual.get(itemName);

            if (actualPair == null) {
                return false;
            }

            if (expectedPair.c != actualPair.c || expectedPair.cost != actualPair.cost) {
                return false;
            }
        }
        return true;
    }

    public static float getTotal(Map<String,MenPair> actualCart){
        float actualTotal=0.0f;
        for(Entry<String,MenPair> e: actualCart.entrySet()){
            actualTotal+=e.getValue().cost*e.getValue().c;
        }
    
        actualTotal*=1.05;
        return actualTotal;
    }

}
