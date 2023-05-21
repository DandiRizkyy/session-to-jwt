import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProduct } from './dto/create-product.dto';
import { error } from 'console';
import { UpdateProduct } from './dto/update-product.dto';
import { PatchProduct } from './dto/patch-product.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}
  
  // business logic get all product + query
  async getAllProducts(query: string) {
    return await this.prismaService.product.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
  }

  // business logic get product by id
  async getProductById(id: number) {
    const product = await this.prismaService.product.findFirst({
      where: {id},
      include: {user: true}
    });

    if (!product || product === null) {
      throw new NotFoundException(`Product with id: ${id} is not found.`);
    }

    return instanceToPlain(product, {excludePrefixes: ['password']})
  }

  // business logic create product

  async createProduct(userId: number, productDto: CreateProduct) {
    try {
      return await this.prismaService.product.create({
        data: {
          ...productDto,
          userId,
        },
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException(
          `User with id: ${productDto.userId} doesn't exist. Add valid userId.`,
        );
      }
    }
    throw error;
  }

  // business logic update product
  async updateProduct(id: number, productDto: UpdateProduct) {
    try {
      return await this.prismaService.product.update({
        where: {
          id: id,
        },
        data: productDto,
      });
    } catch(error){
        if (error.code === 'P2025'){
            throw new NotFoundException(error.meta.cause)
        }
        throw error;
    }
  }

  // business logic update product patch method
  async updateProductPatch(id: number, productDto: PatchProduct) {
    try{
        // desctructure object
        const {title, description, category , userId} = productDto
        return await this.prismaService.product.update({
            where: {
                id: id
            },
            // jika value yang dimasukkan tidak ada, maka tidak akan mengganti field
            data: {
                title: title ? title : undefined,
                description: description ? description : undefined,
                category: category ? category : undefined,
                userId: userId ? userId : undefined,
            }
        })
    }
    catch(error){
        if(error.code === 'P2025'){
            throw new NotFoundException(error.meta.cause)
        }
        throw error;
    }
  }

  // business logic delete product
  async deleteProduct(id: number) {
    try{
        await this.prismaService.product.delete({
            where: {
                id: id,
            },
        });
        return `Data with id: ${id} successfully deleted.`
    }
    catch(error){
        if(error.code === 'P2025'){
            throw new NotFoundException(error.meta.cause)
        }
        throw error;
    }
  }
}
