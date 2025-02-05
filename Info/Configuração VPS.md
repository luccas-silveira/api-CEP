# **Configurando a VPS para rodar o programa**
 
 

# **Passo 1: Configurar o DNS do Domínio**

### **1. Acesse o painel do seu registrador de domínio:**

Entre na conta onde você registrou “silveira.digital”.

### **2. Atualize o registro A:**

Configure o registro A do domínio para apontar para o IP da sua VPS (147.79.87.179).

• **Nome:** @

• **Tipo:** A

• **Valor:** 147.79.87.179

Se desejar também usar o “www.silveira.digital”, crie um registro CNAME ou outro registro A.

### **3. Aguarde a propagação:**

A propagação pode levar alguns minutos até algumas horas. Você pode usar ferramentas online para verificar se o domínio está apontando corretamente para o IP.

---

# **Passo 2: Conectar na VPS Usando Termius**

### **1. Abra o Termius:**

Se ainda não tiver, baixe e instale o Termius (disponível para Windows, macOS, Linux ou dispositivos móveis).

### **2. Crie um novo Host:**

• **Hostname/IP:** 147.79.87.179

• **Porta:** 22 (padrão para SSH)

• **Username:** Normalmente, “root” ou o nome do usuário que você configurou

• **Authentication:** Configure sua senha ou chave SSH, conforme configurado na VPS.

### **3. Conecte-se:**

Clique para conectar ao seu servidor.

---

# **Passo 3: Atualizar a VPS e Instalar o Servidor Web (Nginx)**

### **1. Atualize o sistema:**

Após conectar via SSH (Termius), execute:

```
sudo apt update && sudo apt upgrade -y
```

Isso garante que o sistema esteja atualizado.

### **2. Instale o Nginx:**

Para instalar o Nginx (em distribuições baseadas em Debian/Ubuntu), execute:

```
sudo apt install nginx -y
```

### **3. Verifique se o Nginx está rodando:**

Execute:

```
sudo systemctl status nginx
```

Você deverá ver que o Nginx está ativo.

---

# **Passo 4: Preparar os Arquivos do Site**

### 1. **Criar o diretório para o site:**

Crie uma pasta para os arquivos do seu site, por exemplo:

```
sudo mkdir -p /var/www/silveira
```

Se desejar colocar seu site na raiz do domínio, usaremos essa pasta. Se quiser separar em subdiretórios (por exemplo, para uma aplicação em “/API”), adapte conforme sua necessidade.

### 2. **Ajustar permissões (opcional, mas recomendado):**

Para que o Nginx (usuário “www-data”) consiga ler os arquivos, execute:

```
sudo chown -R www-data:www-data /var/www/silveira
sudo chmod -R 755 /var/www/silveira
```

### 3. **Enviar os arquivos do site para a VPS:**

Criamos os arquivos manualmente no diretório correto 

.html:

```
sudo nano /var/www/silveira/index.html
```

.js

```
sudo nano /var/www/silveira/index.html
```

.css

```
sudo nano /var/www/silveira/stye.css
```

**Exemplo de um arquivo simples:**

Crie um arquivo index.html com o seguinte conteúdo:

```
                                                                          <!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Download CSV</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">

    <div id="box-credit-card-info">
      <form action="">
        <input type="text" class="credit-card-input" placeholder="Cidade" id="cidade">
        <input type="text" class="credit-card-input" placeholder="Estado" id="estado">
      </form>
      <span id="message"></span>
    </div>

    <input class="styled" type="button" value="Buscar" id="send"/>
    <!-- Botão de download oculto inicialmente -->
    <input class="styled" type="button" value="Download" id="download" style="display: none;">

  </div>
  <script src="index.js"></script>
</body>
</html>
```

Salve esse arquivo no diretório onde você fará o upload.

---

# **Passo 5: Configurar o Nginx para Servir o Site**

### 1. **Criar o arquivo de configuração do site:**

Crie um arquivo de configuração em /etc/nginx/sites-available/silveira.digital:

```
sudo nano /etc/nginx/sites-available/silveira.digital
```

### 2. **Insira a seguinte configuração:**

```
server {
    listen 80;
    listen [::]:80;

    server_name silveira.digital www.silveira.digital;

    # Define o diretório raiz para o site
    root /var/www/silveira;
    index index.html index.htm;

    # Se desejar configurar uma localização específica para alguma aplicação, adicione outros blocos location
    # Exemplo:
    # location /api/ {
    #     proxy_pass http://127.0.0.1:3000;
    #     proxy_set_header Host $host;
    #     proxy_set_header X-Real-IP $remote_addr;
    #     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #     proxy_set_header X-Forwarded-Proto $scheme;
    # }

    # Bloco padrão para servir arquivos
    location / {
        try_files $uri $uri/ =404;
    }
}
```

Essa configuração informa ao Nginx que:

•	Quando alguém acessar “silveira.digital”, os arquivos serão servidos a partir de /var/www/silveira.

•	O arquivo índice (por exemplo, index.html) será usado.

### 3. **Salvar e sair:**

No nano, pressione Ctrl+O para salvar e Ctrl+X para sair.

### 4. **Ativar a configuração criando um link simbólico:**

```
sudo ln -s /etc/nginx/sites-available/silveira.digital /etc/nginx/sites-enabled/
```

### 5. **Testar a configuração do Nginx:**

```
sudo nginx -t
```

Se tudo estiver OK, recarregue o Nginx:

```
sudo systemctl reload nginx
```

---

# **Passo 6: Testar o Site**

### 1. **No navegador, acesse:**

```
http://silveira.digital
```

Se o DNS já estiver propagado e a configuração estiver correta, você verá o conteúdo do seu arquivo index.html.

### 2. **Caso o site não apareça:**

•	Verifique se o DNS está propagado usando ferramentas online (como “WhatsMyDNS”).

•	Verifique os logs do Nginx:

```
sudo tail -n 20 /var/log/nginx/error.log
```

•	Certifique-se de que os arquivos foram enviados para o diretório correto (/var/www/silveira).

---

# **Considerações Finais**

• **Segurança:**

Após colocar o site no ar, considere configurar um firewall (como UFW) e instalar um certificado SSL (por exemplo, usando Certbot para Let’s Encrypt) para habilitar HTTPS.

• **Atualizações:**

Sempre que você atualizar os arquivos do seu site localmente, envie-os novamente para a VPS usando SCP ou SFTP.

• **Monitoramento:**

Verifique os logs e o status do Nginx para garantir que o site continue funcionando corretamente.

---

Seguindo esses passos detalhados, seu site “silveira.digital” estará no ar, hospedado na sua VPS e configurado por meio do Termius. Se encontrar algum problema durante o processo, verifique cada etapa ou compartilhe os detalhes para podermos ajudar melhor.
