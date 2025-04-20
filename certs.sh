# Create a directory to store the certificate files
mkdir certs && cd certs

# Generate a private key
openssl genrsa -out selfsigned.key 2048

# Generate a certificate signing request (CSR)
openssl req -new -key selfsigned.key -out selfsigned.csr \
  -subj "/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=localhost"

# Generate the self-signed certificate
openssl x509 -req -days 365 -in selfsigned.csr -signkey selfsigned.key -out selfsigned.crt