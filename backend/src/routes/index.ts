// backend/src/routes/index.ts
import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { StockMovementController } from '../controllers/StockMovementController';
import StockReportController from '../controllers/StockReportController';

const router = Router();

router.post('/products', ProductController.create);
router.get('/products', ProductController.list);
router.get('/products/:id', ProductController.getById);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.delete);

router.post('/stock', StockMovementController.create);
router.get('/report/movements', StockMovementController.reportMovements);
// router.get('/stock/most-moved', StockMovementController.mostMoved);

router.get('/stock-value', StockReportController.totalStockValue);
router.get('/items-sold', StockReportController.totalItemsSold);
router.get('/top-moved-products', StockReportController.topMovedProducts);

export default router;
