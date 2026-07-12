import React, { useState, useRef } from 'react';
import axios from 'axios';

const PainelVendedor = ({ onProdutoAdicionado }) => {
  const [autenticado, setAutenticado] = useState(false);
  const [senhaVendedor, setSenhaVendedor] = useState('');
  const [codigoVendedor, setCodigoVendedor] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    fotos: []
  });

  const [previewFotos, setPreviewFotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validação simples - em produção usar autenticação real
    if (senhaVendedor && codigoVendedor) {
      try {
        // Verificar credenciais no servidor
        const response = await axios.post('/api/vendedores/autenticar', {
          senha: senhaVendedor,
          codigo: codigoVendedor
        });
        
        if (response.data.sucesso) {
          setAutenticado(true);
          localStorage.setItem('vendedorId', response.data.vendedorId);
          localStorage.setItem('vendedorNome', response.data.nome);
          alert('✅ Login realizado com sucesso!');
        } else {
          alert('❌ Senha ou código inválido');
        }
      } catch (error) {
        alert('❌ Erro ao autenticar. Tente novamente.');
      }
    } else {
      alert('⚠️ Preencha todos os campos');
    }
  };

  const handleFotoChange = (e) => {
    const novosArquivos = Array.from(e.target.files);
    const vagas = 5 - previewFotos.length;
    const arquivosParaAdicionar = novosArquivos.slice(0, vagas);

    if (arquivosParaAdicionar.length === 0) {
      e.target.value = '';
      return;
    }

    const leituras = arquivosParaAdicionar.map(file =>
      new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsDataURL(file);
      })
    );

    Promise.all(leituras).then(resultados => {
      setPreviewFotos(prev => [...prev, ...resultados].slice(0, 5));
    });

    setFormData(prev => ({
      ...prev,
      fotos: [...prev.fotos, ...arquivosParaAdicionar]
    }));

    e.target.value = '';
  };

  const removerFoto = (index) => {
    setPreviewFotos(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.descricao || !formData.preco || previewFotos.length === 0) {
      alert('⚠️ Preencha todos os campos e adicione pelo menos uma foto');
      return;
    }

    setLoading(true);

    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append('nome', formData.nome);
      formDataWithFile.append('descricao', formData.descricao);
      formDataWithFile.append('preco', parseFloat(formData.preco));
      formDataWithFile.append('vendedorId', localStorage.getItem('vendedorId'));
      formDataWithFile.append('vendedorNome', localStorage.getItem('vendedorNome'));

      formData.fotos.forEach(foto => {
        formDataWithFile.append('fotos', foto);
      });

      const response = await axios.post('/api/produtos', formDataWithFile, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('✅ Produto adicionado com sucesso!');
      setFormData({ nome: '', descricao: '', preco: '', fotos: [] });
      setPreviewFotos([]);
      
      if (onProdutoAdicionado) onProdutoAdicionado();
    } catch (error) {
      console.error('Erro:', error);
      alert('❌ Erro ao adicionar produto');
    } finally {
      setLoading(false);
    }
  };

  if (!autenticado) {
    return (
      <div className="painel-login">
        <div className="login-box">
          <h2>🔐 Área do Vendedor</h2>
          
          {!showLoginForm ? (
            <button
              onClick={() => setShowLoginForm(true)}
              className="btn-entrar"
            >
              Entrar como Vendedor
            </button>
          ) : (
            <form onSubmit={handleLogin} className="login-form">
              <input
                type="text"
                placeholder="Código do vendedor"
                value={codigoVendedor}
                onChange={(e) => setCodigoVendedor(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={senhaVendedor}
                onChange={(e) => setSenhaVendedor(e.target.value)}
                required
              />
              <button type="submit" className="btn-login">Entrar</button>
              <button
                type="button"
                onClick={() => setShowLoginForm(false)}
                className="btn-voltar"
              >
                Voltar
              </button>
            </form>
          )}

          <p className="info-vendedor">
            📝 Para obter acesso como vendedor, entre em contato conosco.
          </p>
        </div>

        <style>{`
          .painel-login {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 60vh;
            padding: 20px;
          }

          .login-box {
            background: white;
            border: 2px solid #4CAF50;
            border-radius: 12px;
            padding: 40px;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }

          .login-box h2 {
            margin-top: 0;
            color: #333;
          }

          .btn-entrar {
            width: 100%;
            padding: 12px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s;
          }

          .btn-entrar:hover {
            background: #45a049;
          }

          .login-form {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .login-form input {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
          }

          .login-form input:focus {
            outline: none;
            border-color: #4CAF50;
            box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
          }

          .btn-login {
            padding: 10px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s;
          }

          .btn-login:hover {
            background: #45a049;
          }

          .btn-voltar {
            padding: 10px;
            background: #999;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background 0.3s;
          }

          .btn-voltar:hover {
            background: #777;
          }

          .info-vendedor {
            color: #999;
            font-size: 14px;
            margin-top: 20px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="painel-vendedor">
      <div className="painel-header">
        <h2>📦 Adicionar Produto</h2>
        <button
          onClick={() => {
            setAutenticado(false);
            localStorage.removeItem('vendedorId');
            localStorage.removeItem('vendedorNome');
          }}
          className="btn-logout"
        >
          Sair
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form-produto">
        <input
          type="text"
          placeholder="Nome do produto"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
        />

        <textarea
          placeholder="Descrição do produto"
          value={formData.descricao}
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          required
          rows="4"
        />

        <input
          type="number"
          placeholder="Preço (R$)"
          step="0.01"
          value={formData.preco}
          onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
          required
        />

        <div className="upload-fotos">
          <label className="label-upload">
            📸 Adicionar Fotos (máximo 5)
          </label>
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFotoChange}
            disabled={previewFotos.length >= 5}
            aria-hidden="true"
            style={{ display: 'none' }}
          />
          <input
            id="foto-input"
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFotoChange}
            disabled={previewFotos.length >= 5}
            aria-hidden="true"
            style={{ display: 'none' }}
          />
          <div className="upload-botoes">
            <button
              type="button"
              onClick={() => cameraInputRef.current.click()}
              className="btn-upload"
              disabled={previewFotos.length >= 5}
            >
              📷 Tirar Foto
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="btn-upload"
              disabled={previewFotos.length >= 5}
            >
              🖼️ Galeria
            </button>
          </div>
        </div>

        {previewFotos.length > 0 && (
          <div className="preview-fotos">
            <h4>Fotos Selecionadas ({previewFotos.length}/5)</h4>
            <div className="fotos-grid">
              {previewFotos.map((foto, index) => (
                <div key={index} className="foto-preview">
                  <img src={foto} alt={`Preview ${index}`} />
                  <button
                    type="button"
                    onClick={() => removerFoto(index)}
                    className="btn-remover-foto"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-enviar"
        >
          {loading ? 'Adicionando...' : '✅ Adicionar Produto'}
        </button>
      </form>

      <style>{`
        .painel-vendedor {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }

        .painel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .btn-logout {
          background: #f44336;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .btn-logout:hover {
          background: #da190b;
        }

        .form-produto {
          background: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .form-produto input,
        .form-produto textarea {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          font-family: inherit;
        }

        .form-produto input:focus,
        .form-produto textarea:focus {
          outline: none;
          border-color: #4CAF50;
          box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
        }

        .upload-fotos {
          border: 2px dashed #4CAF50;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }

        .label-upload {
          display: block;
          margin-bottom: 10px;
          font-weight: bold;
          color: #333;
        }

        .btn-upload {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.3s;
          flex: 1;
        }

        .upload-botoes {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        .btn-upload:hover:not(:disabled) {
          background: #45a049;
        }

        .btn-upload:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .preview-fotos {
          background: white;
          padding: 15px;
          border-radius: 6px;
        }

        .preview-fotos h4 {
          margin-top: 0;
          color: #333;
        }

        .fotos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 10px;
        }

        .foto-preview {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          border-radius: 6px;
          overflow: hidden;
          background: #e0e0e0;
        }

        .foto-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .btn-remover-foto {
          position: absolute;
          top: 2px;
          right: 2px;
          background: rgba(0,0,0,0.7);
          border: none;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .btn-remover-foto:hover {
          background: rgba(0,0,0,0.9);
        }

        .btn-enviar {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 6px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }

        .btn-enviar:hover:not(:disabled) {
          background: #45a049;
        }

        .btn-enviar:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default PainelVendedor;
