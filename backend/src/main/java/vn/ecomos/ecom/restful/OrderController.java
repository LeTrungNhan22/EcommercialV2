package vn.ecomos.ecom.restful;

import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.ecomos.ecom.base.controller.MainController;
import vn.ecomos.ecom.base.exception.EcomosException;
import vn.ecomos.ecom.base.filter.ResultList;
import vn.ecomos.ecom.controller.OrderCreateController;
import vn.ecomos.ecom.controller.OrderDetailController;
import vn.ecomos.ecom.manager.OrderManager;
import vn.ecomos.ecom.model.input.CancelOrderIP;
import vn.ecomos.ecom.model.input.CreateOrderIP;
import vn.ecomos.ecom.model.input.UpdateStatusInput;
import vn.ecomos.ecom.model.order.Order;
import vn.ecomos.ecom.model.order.OrderDetail;
import vn.ecomos.ecom.model.order.OrderFilter;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/order/1.0.0/")
public class OrderController extends MainController {


    @Autowired
    private OrderCreateController orderCreateController;
    @Autowired
    private OrderManager orderManager;
    @Autowired
    private OrderDetailController orderDetailController;

    @GetMapping()
    public ResponseEntity checkAPI() {
        return ResponseEntity.ok().body("Order Service");
    }


    @ApiOperation(value = "create new  order")
    @PostMapping("/order")
    public List<Order> createOrder(@RequestBody CreateOrderIP createInput) throws EcomosException {
        return orderCreateController.createOrder(createInput);
    }

    @ApiOperation(value = "cancel order by orderId")
    @PutMapping("/order/{orderId}/cancel")
    public Order cancelOrder(@PathVariable String orderId, @RequestBody CancelOrderIP cancelInput) throws EcomosException {
        return orderDetailController.cancelOrder(orderId, cancelInput);
    }

    @ApiOperation(value = "update order status by orderId")
    @PutMapping("/order/{orderId}/status")
    public Order updateOrderStatus(@PathVariable String orderId, @RequestBody UpdateStatusInput statusBody) throws EcomosException {
        return orderManager.updateOrderStatus(orderId, statusBody);
    }

    @ApiOperation(value = "find order request")
    @PostMapping("/order/filter")
    public ResultList<Order> filterOrder(@RequestBody OrderFilter filterData) {
        return orderManager.filterOrder(filterData);
    }

    @ApiOperation(value = "get order by orderId")
    @GetMapping("/order/{orderId}")
    public Order getOrder(@PathVariable String orderId) throws EcomosException {
        Order data = orderManager.getOrder(orderId);
        if (null == data) {
            throw new EcomosException("not_found", "Không tìm thấy thông tin order ", "Not found order by order id: " + orderId);
        }
        return data;
    }

    @ApiOperation(value = "get order detail by orderId")
    @GetMapping("/order-detail/{orderId}")
    public OrderDetail getOrderDetail(@PathVariable String orderId) throws EcomosException {
        return orderDetailController.getOrderDetail(orderId);
    }

    private final static Logger LOGGER = LoggerFactory.getLogger(OrderController.class);

    @ExceptionHandler(EcomosException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR) // 500
    public final Object handleAllServiceException(EcomosException e) {

        LOGGER.error("ServiceException error.", e);

        return error(e.getErrorCode(), e.getErrorMessage(), e.getErrorDetail());
    }

    @ExceptionHandler(RuntimeException.class)

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)

    public final Object handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return error("internal_server_error", "Có lỗi trong quá trình xử lý", e.getMessage());
    }
}
