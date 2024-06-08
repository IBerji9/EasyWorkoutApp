"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const firebase_service_1 = require("./firebase.service");
const admin = require("firebase-admin");
const firebaseProvider = {
    provide: 'FIREBASE_APP',
    inject: [config_1.ConfigService],
    useFactory: (configService) => {
        const firebaseConfig = {
            type: configService.get('TYPE'),
            project_id: configService.get('PROJECT_ID'),
            private_key_id: configService.get('PRIVATE_KEY_ID'),
            private_key: configService.get('NODE_ENV') === 'production'
                ? JSON.parse(configService.get('PRIVATE_KEY'))
                : configService.get('PRIVATE_KEY'),
            client_email: configService.get('CLIENT_EMAIL'),
            client_id: configService.get('CLIENT_ID'),
            auth_uri: configService.get('AUTH_URI'),
            token_uri: configService.get('TOKEN_URI'),
            auth_provider_x509_cert_url: configService.get('AUTH_CERT_URL'),
            client_x509_cert_url: configService.get('CLIENT_CERT_URL'),
            universe_domain: configService.get('UNIVERSAL_DOMAIN'),
        };
        return admin.initializeApp({
            credential: admin.credential.cert(firebaseConfig),
            databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
            storageBucket: `${firebaseConfig.projectId}.appspot.com`,
        });
    },
};
let FirebaseModule = class FirebaseModule {
};
exports.FirebaseModule = FirebaseModule;
exports.FirebaseModule = FirebaseModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [firebaseProvider, firebase_service_1.FirebaseService],
        exports: [firebase_service_1.FirebaseService],
    })
], FirebaseModule);
//# sourceMappingURL=firebase.module.js.map