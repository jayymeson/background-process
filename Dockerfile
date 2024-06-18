# Usar a imagem oficial do Node.js com base no Alpine Linux
FROM node:18-alpine

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar os arquivos de configuração do aplicativo para o contêiner
COPY package*.json ./

# Instalar as dependências do aplicativo
RUN npm install

# Instalar o NestJS CLI localmente
RUN npm install @nestjs/cli

# Copiar os templates de email para o contêiner
COPY src/shared/mail/templates ./src/shared/mail/templates

# Copiar o restante dos arquivos do aplicativo para o contêiner
COPY . .

# Ajustar permissões para evitar problemas de permissão
RUN chmod +x node_modules/.bin/nest

# Compilar o aplicativo TypeScript
RUN npm run build

# Expor a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "run", "start:prod"]
