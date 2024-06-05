# Aplicação de Rede Social - Thoughts

## Visão Geral

Esta é uma aplicação de rede social projetada para fornecer uma plataforma onde os usuários podem interagir, compartilhar postagens e seguir uns aos outros. 

## Arquitetura

### Arquitetura Atual

- **Arquitetura Monolítica:** A arquitetura atual é monolítica, onde todas as funcionalidades fazem parte de uma única base de código.
- **Banco de Dados:** Um único banco de dados é utilizado para todos os serviços e funcionalidades.
- **Endpoints:** A aplicação possui endpoints para listagem de usuários, criação de postagens e seguir usuários.

### Melhorias

1. **Sistemas de Mensageria:** Implementar sistemas de mensageria para lidar com a comunicação assíncrona entre diferentes serviços. Isso ajudará a desacoplar os serviços e melhorar a escalabilidade.
   
2. **Arquitetura de Microserviços:** Desmembrar a arquitetura monolítica em microserviços. Cada microserviço irá lidar com um domínio específico (por exemplo, serviço de usuários, serviço de postagens) e utilizará seu próprio banco de dados.
   
3. **Kubernetes para Orquestração:** Utilizar Kubernetes para orquestração de contêineres, gerenciando a implantação, escalabilidade e operações dos microserviços.

4. **Escalabilidade Horizontal e Vertical:** Implementar estratégias de escalabilidade horizontal e vertical para lidar com o aumento da carga e garantir alta disponibilidade.

5. **Api Gateway:** A utilização de API Gateways facilitará a gestão do tráfego de entrada, melhorando a segurança, a escalabilidade.

6. **Padrão de Design - Outbox:** Utilizar o padrão de design Outbox para garantir a entrega confiável de mensagens em sistemas distribuídos.

7. **Testes:** 
    - **Testes Unitários:** Vai nos permitir identificar e corrigir erros nas fases iniciais do desenvolvimento, antes que o código seja integrado com outras partes do sistema. Isso reduz a chance de defeitos complexos e difíceis de rastrear no futuro.
    - **Testes End-to-End:** Implementar testes E2E para garantir que a aplicação funcione conforme o esperado.
    - **Testes de Performance:** Realizar testes de performance regularmente para identificar e resolver gargalos.

8. **Cache:** Implementar mecanismos de cache para melhorar o desempenho e reduzir a carga no banco de dados.

9. **Logging e Monitoramento:**
    - **Prometheus e Grafana:** Utilizar Prometheus para monitoramento de métricas e Grafana para visualização dessas métricas.
    - **Rastreio de Requisições:** Implementar rastreamento de requisições para acompanhar o fluxo de requisições pela aplicação e identificar problemas.

10. **Esteira de CI/CD:** Configurar uma esteira de CI/CD para automatizar os processos de build, teste e implantação.



## Autocrítica

Embora a arquitetura monolítica atual forneça uma abordagem simples e direta para o desenvolvimento inicial, ela apresenta desafios para escalabilidade e manutenção. A transição para uma arquitetura de microserviços com bancos de dados individuais ajudará a desacoplar os serviços e escalá-los de forma independente. Implementar um sistema de mensageria permitirá comunicação assíncrona entre serviços, melhorando o desempenho e a confiabilidade.

O uso de padrões de design como Outbox garantirá o manuseio confiável de mensagens. Testes abrangentes, incluindo testes E2E e de performance, ajudarão a identificar problemas precocemente e garantir que a aplicação atenda às expectativas de desempenho.

Implementar uma robusta esteira de CI/CD agilizará os processos de desenvolvimento e implantação, garantindo a entrega rápida de funcionalidades e correções. Logging, monitoramento e rastreamento de requisições fornecerão insights sobre o desempenho da aplicação e ajudarão a diagnosticar e resolver problemas rapidamente.
