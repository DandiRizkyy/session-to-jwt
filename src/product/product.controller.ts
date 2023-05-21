import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards, } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProduct } from './dto/create-product.dto';
import { UpdateProduct } from './dto/update-product.dto';
import { PatchProduct } from './dto/patch-product.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { ProductRelationEntity } from './entities/product-relation.entity';

@Controller('products')
@ApiTags('products')
export class ProductController {
    constructor(private productService: ProductService){}
    
    // get all product + query
    @UseGuards(AuthenticatedGuard)
    @ApiOkResponse({type: ProductEntity, isArray: true})
    @ApiBearerAuth()
    @ApiQuery({name: 'q', description: 'query searh for products', required: false, type: String})
    @Get()
    async getAllProducts(@Query('q') query?: string){
        return await this.productService.getAllProducts(query)
    }

    // get by id
    @UseGuards(AuthenticatedGuard)
    @ApiOkResponse({type: ProductRelationEntity, isArray: true})
    @ApiBearerAuth()
    @Get(':id')
    async getProductById(@Param('id', ParseIntPipe) id: number){
        return await this.productService.getProductById(id)
    }

    // create product
    @UseGuards(AuthenticatedGuard)
    @ApiCreatedResponse({type: ProductEntity})
    @ApiBearerAuth()
    @Post()
    async createProduct(
    @Body('userId', ParseIntPipe) userId: number, 
    @Body() productDto: CreateProduct){
        return await this.productService.createProduct(userId, productDto)
    }

    // update product
    @UseGuards(AuthenticatedGuard)
    @ApiOkResponse({type: ProductEntity})
    @ApiBearerAuth()
    @Put(':id')
    async updateProduct(
    @Param('id', ParseIntPipe) id: number, 
    @Body() productDto: UpdateProduct){
        return await this.productService.updateProduct(id, productDto)
    }

    // update product (PATCH)
    @UseGuards(AuthenticatedGuard)
    @ApiOkResponse({type: ProductEntity})
    @ApiBearerAuth()
    @Patch(':id')
    async updateProductPatch(
    @Param('id', ParseIntPipe) id: number, 
    @Body() productDto: PatchProduct){
        return await this.productService.updateProductPatch(id, productDto)
    }

    // delete product
    @UseGuards(AuthenticatedGuard)
    @ApiOkResponse({status: 200, description: 'Data with id: {id from user} successfully deleted.'})
    @ApiBearerAuth()
    @Delete(':id')
    async deleteProduct(@Param('id', ParseIntPipe) id: number){
        return await this.productService.deleteProduct(id)
    }

}
