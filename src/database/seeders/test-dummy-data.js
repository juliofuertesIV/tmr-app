/**
 * Seeder file for Contests, Inscriptions, and Voters.
 */
const { v4: uuidv4 } = require('uuid');
const faker = require('faker');

const contestId = 'f003d9eb-e15e-420e-b3a8-178b96d01325'; // The dummy contest ID used in the up method
const mediaId = 'test-media'
const footerId = uuidv4()

module.exports = {
    up: async (queryInterface) => {
        // Create a Footer

        await queryInterface.bulkInsert('Footers', [
            {
                id: footerId,
                name: 'Battle of the Bands 2025',
            }
        ])

        await queryInterface.bulkInsert('Contests', [
            {
                id: contestId,
                name: 'Battle of the Bands',
                domain: 'contest.battleofthebands.com',
                year: 2025,
                metaUrl: 'https://battleofthebands.com',
                metaTitle: 'Battle of the Bands',
                metaDescription: 'The ultimate band contest of the year.',
                StateId: 'open',
                FooterId: footerId,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        await queryInterface.bulkInsert('Media', [
            {
                id: mediaId,
                src: '/img/no-image-placeholder.svg',
                width: 500,
                height: 500,
                alt: 'Test image for dummy data'
            }
        ])

        // Create 10 Inscriptions for the Contest
        const inscriptions = Array.from({ length: 10 }).map(() => ({
            id: uuidv4(),
            name: faker.company.companyName(),
            description: faker.lorem.paragraph(),
            year: 2025,
            city: faker.address.city(),
            video: faker.internet.url(),
            instagram: faker.internet.userName(),
            spotify: faker.internet.url(),
            tiktok: faker.internet.userName(),
            contactName: faker.name.findName(),
            email: faker.internet.email(),
            phone: '666-666-666',
            verified: faker.datatype.boolean(),
            discarded: false,
            previousPosition: faker.datatype.number({ min: 1, max: 10 }),
            isStarred: faker.datatype.boolean(),
            MediumId: mediaId,
            ContestId: contestId,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
        await queryInterface.bulkInsert('Inscriptions', inscriptions);

        // Create 20 Voters for the Contest
        const voters = Array.from({ length: 20 }).map(() => ({
            id: uuidv4(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            emailToken: uuidv4(),
            emailVerified: faker.datatype.boolean(),
            acceptsCommunications: faker.datatype.boolean(),
            ContestId: contestId,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
        await queryInterface.bulkInsert('Voters', voters);
    },

    
    async down(queryInterface) {
        await queryInterface.bulkDelete(
            'Voters',
            { ContestId: contestId },
            {}
        );

        await queryInterface.bulkDelete(
            'Inscriptions',
            { ContestId: contestId },
            {}
        );

        
        await queryInterface.bulkDelete(
            'Media',
            { id: mediaId },
            {}
        );

        await queryInterface.bulkDelete(
            'Contests',
            { id: contestId },
            {}
        );

        await queryInterface.bulkDelete(
            'Footers',
            { id: footerId }
        );
    }
};
