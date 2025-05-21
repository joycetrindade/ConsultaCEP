function consultaCEP() {
  const cepInput = document.getElementById('cep').value.trim();
  const cep = cepInput.replace('-', '').replace(/\s/g, '');
  const result = document.getElementById('result');
  result.innerHTML = '';

  if (!/^\d{8}$/.test(cep)) {
    result.innerHTML = `
      <div class="alert alert-danger" role="alert">
        <strong>CEP inválido!</strong><br>
        Insira 8 dígitos numéricos correspondentes ao CEP.<br>
        Exemplo: 90630-090 ou 90630090.
      </div>`;
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        result.innerHTML = `
          <div class="alert alert-warning" role="alert">
            <strong>CEP não localizado!</strong><br>
            Verifique se o CEP digitado está correto.
          </div>`;
      } else {
        result.innerHTML = `
          <div class="card text-start mx-auto" style="max-width: 400px;">
            <div class="card-body">
              <h5 class="card-title text-primary">Informações do CEP</h5>
              <p class="card-text"><strong>Logradouro:</strong> ${data.logradouro || 'N/A'}</p>
              <p class="card-text"><strong>Bairro:</strong> ${data.bairro || 'N/A'}</p>
              <p class="card-text"><strong>Cidade:</strong> ${data.localidade}</p>
              <p class="card-text"><strong>Estado:</strong> ${data.uf}</p>
            </div>
          </div>`;
      }
    })
    .catch(error => {
      result.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <strong>Erro ao buscar o CEP!</strong><br>
          Tente novamente mais tarde.
        </div>`;
      console.error('Erro:', error);
    });
}
