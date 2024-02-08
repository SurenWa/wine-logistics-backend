// seed.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
//import seedData from 'src/seed/data/sample-business-data.json';
//import sampleUsers from 'src/seed/data/sample-users.json'; // Assuming seed data is stored in a JSON file

@Injectable()
export class SeedService {
    constructor(private readonly prisma: PrismaService) {}

    // async seedBusinesses() {
    //     for (const businessData of seedData) {
    //         await this.prisma.businesses.create({
    //             data: businessData,
    //         });
    //     }
    //     console.log('Businesses seeded successfully.');
    // }

    // async seedUsers() {
    //     for (const usersData of sampleUsers) {
    //         await this.prisma.user.create({
    //             data: usersData,
    //         });
    //     }
    //     console.log('Businesses seeded successfully.');
    // }
}
