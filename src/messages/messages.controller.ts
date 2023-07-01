import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { createMessageDto } from './dtos/create-message.dto';
import { MessagesRepository } from './messages.repository';

@Controller('messages')
export class MessagesController {

    constructor(public messageRepo: MessagesRepository){}

    @Get() 
    listMessages() {
        return this.messageRepo.findAll()
    }

    @Post()
    createMessage(@Body() body: createMessageDto) {
        return this.messageRepo.create(body.content)
    }

    @Get('/:id')
    async getMessage(@Param('id') id: string) {
        const message = await this.messageRepo.findOne(id)
        
        if (!message) throw new NotFoundException('Message not found')
        
        return message
    }
}
