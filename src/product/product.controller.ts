import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards, } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProduct } from './dto/create-product.dto';
import { UpdateProduct } from './dto/update-product.dto';
import { PatchProduct } from './dto/patch-product.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { ProductRelationEntity } from './entities/product-relation.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('products')
@ApiTags('products')
export class ProductController {
    constructor(private productService: ProductService){}
    
    // get all product + query
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: ProductEntity, isArray: true})
    @ApiBearerAuth()
    @ApiQuery({name: 'q', description: 'query searh for products', required: false, type: String})
    @Get()
    async getAllProducts(@Query('q') query?: string){
        return await this.productService.getAllProducts(query)
    }

    // get by id
    @ApiOkResponse({type: ProductRelationEntity, isArray: true})
    @ApiBearerAuth()
    @Get(':id')
    async getProductById(@Param('id', ParseIntPipe) id: number){
        return await this.productService.getProductById(id)
    }

    // create product
    @ApiCreatedResponse({type: ProductEntity})
    @ApiBearerAuth()
    @Post()
    async createProduct(
    @Body('userId', ParseIntPipe) userId: number, 
    @Body() productDto: CreateProduct){
        return await this.productService.createProduct(userId, productDto)
    }

    // update product
    @ApiOkResponse({type: ProductEntity})
    @ApiBearerAuth()
    @Put(':id')
    async updateProduct(
    @Param('id', ParseIntPipe) id: number, 
    @Body() productDto: UpdateProduct){
        return await this.productService.updateProduct(id, productDto)
    }

    // update product (PATCH)
    @ApiOkResponse({type: ProductEntity})
    @ApiBearerAuth()
    @Patch(':id')
    async updateProductPatch(
    @Param('id', ParseIntPipe) id: number, 
    @Body() productDto: PatchProduct){
        return await this.productService.updateProductPatch(id, productDto)
    }

    // delete product
    @ApiOkResponse({status: 200, description: 'Data with id: {id from user} successfully deleted.'})
    @ApiBearerAuth()
    @Delete(':id')
    async deleteProduct(@Param('id', ParseIntPipe) id: number){
        return await this.productService.deleteProduct(id)
    }

}
