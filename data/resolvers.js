import bcrypt from 'bcrypt';

import { Student } from './connectors';
import { Store } from './connectors';
import { Item } from './connectors';
import { Order } from './connectors';
import getUser from './utils';

const APP_SECRET = 'secret';
const jwt = require('jsonwebtoken');

const resolvers = {

    Query: {
        getStudent(root, args, context, info){
            return Student.findAll({where: args});
        },
        getStore(root, args, context, info){
            return Store.findAll({where: args});
        },
        getItem(root, args, context, info){
            return Item.findAll({where: args});
        },
        getOrder(root, args, context, info){
            return Order.findAll({where: args});
        },
    },

    Mutation: {
        createStudent(root, args, context, info){
            return Student.create({StudentName: input.StudentName, StudentPhone: input.StudentPhone});
        },
        async login(root, args, context, info){
            var user = await Student.find({ where: { StudentName: args.StudentName } });
            if (!user) {
                throw new Error('No such user found');
            }

            const isValidPassword = await bcrypt.compare(args.Password, user.Password)
            if (!isValidPassword) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign({ username: user.StudentName, id: user.id }, APP_SECRET)
            return {
                token: token,
                user: user.StudentName
            }
        },
        async register(root, args, context, info){
            if(await Student.find({where: {StudentName: args.StudentName}})) {
                throw new Error("Username already taken");
            }

            const hash = await bcrypt.hashSync(args.Password, 10);
            return await Student.create({StudentName: args.StudentName, Password: hash});
        },
        async editStudentProfile(root, args, context, info){
            const username = getUser(context);
            Student.update({StudentPhone: args.StudentPhone, StudentEmail: args.StudentEmail}, {where: {StudentName: username}});
            return Student.find({where: {StudentName: username}});
        }
    }
};

export default resolvers;