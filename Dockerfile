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

# Copiar o restante dos arquivos do aplicativo para o contêiner
COPY . .

# Ajustar permissões para evitar problemas de permissão
RUN chmod +x node_modules/.bin/nest

# Compilar o aplicativo TypeScript
RUN npm run build

# Certifique-se de criar o diretório de destino para os templates
RUN mkdir -p ./dist/shared/mail/templates

# Certifique-se de copiar os templates para o diretório dist
COPY ./src/shared/mail/templates ./dist/shared/mail/templates/

# Listar o conteúdo do diretório dist para verificação
RUN ls -la ./dist/shared/mail/templates

# Expor a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "run", "start:prod"]
