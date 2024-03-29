package vn.ecomos.ecom.manager;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.FindOneAndUpdateOptions;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.stereotype.Repository;
import vn.ecomos.ecom.base.exception.EcomosException;
import vn.ecomos.ecom.base.manager.BaseManager;
import vn.ecomos.ecom.base.logs.ActivityLog;
import vn.ecomos.ecom.model.cart.Cart;
import vn.ecomos.ecom.model.cart.CartItem;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.mongodb.client.model.ReturnDocument.AFTER;

@Repository
public class CartManager extends BaseManager {
    public CartManager(MongoClient mongoClient) {
        super(mongoClient);
    }

    private MongoCollection<Cart> cartMongoCollection;

    public MongoCollection<Cart> getCartMongoCollection() {
        if (cartMongoCollection == null) {
            cartMongoCollection = getCollection(Cart.class);
        }
        return cartMongoCollection;
    }

    private MongoCollection<CartItem> cartItemMongoCollection;

    public MongoCollection<CartItem> getCartItemMongoCollection() {
        if (cartItemMongoCollection == null) {
            cartItemMongoCollection = getCollection(CartItem.class);
        }
        return cartItemMongoCollection;
    }

    public Cart getCart(String userId) {
        return getCartMongoCollection().find(Filters.eq("userId", userId)).first();

    }

    public Cart getCartById(String userId) {
        return getCartMongoCollection().find(Filters.eq("_id", userId)).first();

    }

    public CartItem getCartItem(String cartItemId) {
        return getCartItemMongoCollection().find(Filters.eq("_id", cartItemId)).first();
    }

    public CartItem getCartItem(String cartId, String variantId) {
        List<Bson> filter = new ArrayList<>();
        filter.add(Filters.eq("cartId", cartId));
        filter.add(Filters.eq("productVariant._id", variantId));
        return getCartItemMongoCollection().find(Filters.and(filter)).first();
    }


    public List<CartItem> getCartItems(String cartId) {
        return getCartItemMongoCollection().find(Filters.eq("cartId", cartId)).into(new ArrayList<>());
    }

    public List<ActivityLog> getActivityLogs(String requestId) {
        return getActivityLogs(requestId);
    }

    public Cart createCart(Cart cart, List<CartItem> cartItems) {
        cart.setCreatedAt(new Date());
        cart.setId(generateId());
        cart.setUpdatedAt(null);
        getCartMongoCollection().insertOne(cart);
        if (null != cartItems && cartItems.size() != 0) {
            for (CartItem cartItem : cartItems) {
                cartItem.setId(generateId());
                cartItem.setCartId(cart.getId());
                cartItem.setCreatedAt(new Date());
                cartItem.setUpdatedAt(null);
            }
            getCartItemMongoCollection().insertMany(cartItems);

        }
        return cart;
    }

    public CartItem createCartItem(CartItem cartItem) {
        cartItem.setCreatedAt(new Date());
        cartItem.setUpdatedAt(null);
        cartItem.setId(generateId());
        getCartItemMongoCollection().insertOne(cartItem);
        return cartItem;

    }

    public Cart updateCartQuantity(String cartId, long quantity, double discount,
                                   double totalCurrent, double totalPrice) {
        Document updateDocument = new Document();
        updateDocument.put("updatedAt", new Date());
        updateDocument.put("totalQuantity", quantity);
        updateDocument.put("totalDiscount", discount);
        updateDocument.put("totalCurrentPrice", totalCurrent);
        updateDocument.put("totalPrice", totalPrice);

        Document newDocument = new Document();
        newDocument.append("$set", updateDocument);
        FindOneAndUpdateOptions options = new FindOneAndUpdateOptions().returnDocument(AFTER);
        List<Bson> filters = new ArrayList<>();
        filters.add(Filters.eq("_id", cartId));
        return getCartMongoCollection().findOneAndUpdate(Filters.and(filters), newDocument, options);
    }

    public CartItem updateQuantityCartItem(String cartItemId, long quantity, double totalPrice) throws EcomosException {
        Document updateDocument = new Document();
        updateDocument.put("updatedAt", new Date());
        updateDocument.put("quantity", quantity);
        updateDocument.put("totalPrice", totalPrice);
        Document newDocument = new Document();
        newDocument.append("$set", updateDocument);
        FindOneAndUpdateOptions options = new FindOneAndUpdateOptions().returnDocument(AFTER);
        List<Bson> filters = new ArrayList<>();
        filters.add(Filters.eq("_id", cartItemId));
        return getCartItemMongoCollection().findOneAndUpdate(Filters.and(filters), newDocument, options);
    }

    public void deleteCartItem(String cartItemId) {
        getCartItemMongoCollection().deleteOne(Filters.eq("_id", cartItemId));
    }


}
