
        // Initialize EmailJS
        (function(){
            emailjs.init("zIeqBcQvqDWK7b_66");
        })();

        // Mobile menu toggle
        function toggleMobileMenu() {
            document.getElementById('navLinks').classList.toggle('active');
        }

        // Chatbot Logic
        const chatState = {
            step: 'inicio',
            data: {},
            selectedPlan: null
        };

        const messages = {
            welcome: `¡Hola! 👋 Bienvenido a *King Marketing*

Soy tu asistente virtual y estoy aquí para ayudarte a encontrar la mejor solución de marketing para tu negocio.

¿En qué puedo ayudarte hoy?`,
            
            services: `¡Perfecto! En *King Marketing* tenemos planes para cada etapa de tu negocio:

🚀 *Plan Starter* - $999/mes
Ideal para empezar tu presencia digital

👑 *Plan Professional* - $2,499/mes
Para empresas en crecimiento

💎 *Plan Enterprise* - $4,999/mes
Solución completa para corporativos

¿Qué plan te interesa o quieres que te ayude a elegir?`,

            whyUs: `¿Por qué elegir *King Marketing*? 👑

✅ *15+ años* de experiencia
✅ *800+ clientes* satisfechos
✅ *98%* tasa de retención
✅ *$50M+* en ventas generadas
✅ Equipo de *50+ especialistas*
✅ Soporte *24/7* 

Trabajamos con empresas como Coca-Cola, Toyota, BBVA y muchas más.

¿Te gustaría agendar una reunión o solicitar una cotización?`
        };

        const quickRepliesOptions = {
            inicio: [
                { text: '📋 Ver Planes', value: '1' },
                { text: '💰 Cotización', value: '2' },
                { text: '📅 Agendar Reunión', value: '3' },
                { text: '❓ ¿Por qué King?', value: '4' }
            ],
            servicios: [
                { text: '🚀 Plan Starter', value: 'starter' },
                { text: '👑 Plan Professional', value: 'professional' },
                { text: '💎 Plan Enterprise', value: 'enterprise' },
                { text: '🔙 Volver', value: 'menu' }
            ],
            planes: [
                { text: '💰 Solicitar cotización', value: 'cotizar' },
                { text: '📅 Agendar reunión', value: 'agendar' },
                { text: '📞 Llamar ahora', value: 'llamar' },
                { text: '🔙 Ver otros planes', value: 'planes' }
            ]
        };

        function initChat() {
            setTimeout(() => {
                addBotMessage(messages.welcome);
                showQuickReplies('inicio');
            }, 1000);
        }

        function toggleChat() {
            const chatWindow = document.getElementById('chatWindow');
            chatWindow.classList.toggle('open');
            if (chatWindow.classList.contains('open')) {
                setTimeout(() => scrollToBottom(), 100);
            }
        }

        function addMessage(text, isBot = true) {
            const messagesContainer = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;
            
            text = text.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
            text = text.replace(/\n/g, '<br>');
            
            messageDiv.innerHTML = text;
            messagesContainer.appendChild(messageDiv);
            scrollToBottom();
        }

        function addBotMessage(text) {
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                addMessage(text, true);
            }, 1000 + Math.random() * 1000);
        }

        function showTypingIndicator() {
            const messagesContainer = document.getElementById('chatMessages');
            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.id = 'typing';
            typingDiv.innerHTML = '<span></span><span></span><span></span>';
            messagesContainer.appendChild(typingDiv);
            scrollToBottom();
        }

        function hideTypingIndicator() {
            const typing = document.getElementById('typing');
            if (typing) typing.remove();
        }

        function showQuickReplies(type) {
            const container = document.getElementById('quickReplies');
            container.innerHTML = '';
            
            const replies = quickRepliesOptions[type] || [];
            replies.forEach(reply => {
                const button = document.createElement('button');
                button.className = 'quick-reply';
                button.textContent = reply.text;
                button.onclick = () => handleQuickReply(reply.value, reply.text);
                container.appendChild(button);
            });
        }

        function handleQuickReply(value, text) {
            addMessage(text, false);
            handleUserInput(value);
        }

        function handleUserInput(input) {
            const normalizedInput = input.toLowerCase().trim();

            switch (chatState.step) {
                case 'inicio':
                    if (normalizedInput === '1' || normalizedInput.includes('plan')) {
                        addBotMessage(messages.services);
                        chatState.step = 'servicios';
                        showQuickReplies('servicios');
                    } else if (normalizedInput === '2' || normalizedInput.includes('cotiz')) {
                        addBotMessage('¡Excelente! Para preparar tu cotización personalizada, necesito algunos datos:\n\n📝 ¿Cuál es tu nombre?');
                        chatState.step = 'cotizacion_nombre';
                        document.getElementById('quickReplies').innerHTML = '';
                    } else if (normalizedInput === '3' || normalizedInput.includes('agendar') || normalizedInput.includes('reunión')) {
                        addBotMessage('¡Perfecto! Agendemos una reunión 📅\n\n¿Cuál es tu nombre?');
                        chatState.step = 'reunion_nombre';
                        document.getElementById('quickReplies').innerHTML = '';
                    } else if (normalizedInput === '4' || normalizedInput.includes('por qué')) {
                        addBotMessage(messages.whyUs);
                        showQuickReplies('inicio');
                    } else {
                        addBotMessage('No entendí tu mensaje. 🤔\n\nPor favor selecciona una de las opciones disponibles.');
                    }
                    break;

                case 'servicios':
                    if (normalizedInput === 'starter' || normalizedInput === 'professional' || normalizedInput === 'enterprise') {
                        chatState.selectedPlan = normalizedInput;
                        const planDetails = {
                            'starter': '🚀 *Plan Starter - $999/mes*\n\n✓ 2 Redes Sociales\n✓ 12 Publicaciones\n✓ Community Management\n✓ Reportes Mensuales',
                            'professional': '👑 *Plan Professional - $2,499/mes*\n\n✓ 4 Redes Sociales\n✓ 25 Publicaciones\n✓ Campañas Ads\n✓ Email Marketing\n✓ SEO Avanzado',
                            'enterprise': '💎 *Plan Enterprise - $4,999/mes*\n\n✓ Redes Ilimitadas\n✓ Publicaciones Ilimitadas\n✓ Equipo Dedicado 24/7\n✓ Todo incluido'
                        };
                        addBotMessage(planDetails[normalizedInput] + '\n\n¿Qué te gustaría hacer?');
                        chatState.step = 'plan_seleccionado';
                        showQuickReplies('planes');
                    } else if (normalizedInput === 'menu') {
                        addBotMessage(messages.welcome);
                        chatState.step = 'inicio';
                        showQuickReplies('inicio');
                    } else {
                        addBotMessage('Por favor selecciona uno de los planes disponibles.');
                    }
                    break;

                case 'plan_seleccionado':
                    if (normalizedInput === 'cotizar') {
                        addBotMessage('¡Perfecto! Para tu cotización personalizada del Plan ' + chatState.selectedPlan.toUpperCase() + ':\n\n📝 ¿Cuál es tu nombre?');
                        chatState.step = 'cotizacion_nombre';
                        document.getElementById('quickReplies').innerHTML = '';
                    } else if (normalizedInput === 'agendar') {
                        addBotMessage('¡Excelente! Agendemos una reunión para hablar del Plan ' + chatState.selectedPlan.toUpperCase() + '\n\n📝 ¿Cuál es tu nombre?');
                        chatState.step = 'reunion_nombre';
                        document.getElementById('quickReplies').innerHTML = '';
                    } else if (normalizedInput === 'llamar') {
                        addBotMessage('¡Genial! Puedes llamarnos directamente:\n\n📱 WhatsApp: +57 350 389 9157\n☎️ Oficina CDMX: +52 55 1234 5678\n\nO también puedes solicitar que te llamemos dejando tus datos.');
                        showQuickReplies('planes');
                    } else if (normalizedInput === 'planes') {
                        addBotMessage(messages.services);
                        chatState.step = 'servicios';
                        showQuickReplies('servicios');
                    }
                    break;

                case 'cotizacion_nombre':
                    chatState.data.nombre = input;
                    addBotMessage(`Mucho gusto *${chatState.data.nombre}*! 😊\n\n¿Cuál es el nombre de tu empresa?`);
                    chatState.step = 'cotizacion_empresa';
                    break;

                case 'cotizacion_empresa':
                    chatState.data.empresa = input;
                    addBotMessage('Excelente! ¿Cuál es tu email de contacto? 📧');
                    chatState.step = 'cotizacion_email';
                    break;

                case 'cotizacion_email':
                    chatState.data.email = input;
                    addBotMessage('Perfecto! ¿Tu teléfono o WhatsApp? 📱');
                    chatState.step = 'cotizacion_telefono';
                    break;

                case 'cotizacion_telefono':
                    chatState.data.telefono = input;
                    
                    sendLeadData({
                        ...chatState.data,
                        plan: chatState.selectedPlan || 'No especificado',
                        tipo: 'Cotización'
                    });
                    
                    addBotMessage(`¡Excelente *${chatState.data.nombre}*! ✅\n\n*Resumen de tu solicitud:*\n👤 ${chatState.data.nombre}\n🏢 ${chatState.data.empresa}\n📧 ${chatState.data.email}\n📱 ${chatState.data.telefono}\n📋 Plan: ${chatState.selectedPlan || 'Por definir'}\n\n*Un ejecutivo te contactará en las próximas 24 horas* para enviarte tu cotización personalizada.\n\nMientras tanto, ¿hay algo más en lo que pueda ayudarte?`);
                    
                    chatState.step = 'inicio';
                    chatState.data = {};
                    showQuickReplies('inicio');
                    break;

                case 'reunion_nombre':
                    chatState.data.nombre = input;
                    addBotMessage(`Perfecto *${chatState.data.nombre}*! 📅\n\n¿Cuál es tu email?`);
                    chatState.step = 'reunion_email';
                    break;

                case 'reunion_email':
                    chatState.data.email = input;
                    addBotMessage('¿Tu teléfono o WhatsApp? 📱');
                    chatState.step = 'reunion_telefono';
                    break;

                case 'reunion_telefono':
                    chatState.data.telefono = input;
                    
                    sendLeadData({
                        ...chatState.data,
                        plan: chatState.selectedPlan || 'No especificado',
                        tipo: 'Reunión'
                    });
                    
                    addBotMessage(`¡Listo *${chatState.data.nombre}*! ✅\n\n*Solicitud de reunión registrada*\n👤 ${chatState.data.nombre}\n📧 ${chatState.data.email}\n📱 ${chatState.data.telefono}\n\n*Un asesor te contactará para confirmar fecha y hora.*\n\n¡Gracias por confiar en King Marketing! 👑`);
                    
                    chatState.step = 'inicio';
                    chatState.data = {};
                    showQuickReplies('inicio');
                    break;

                default:
                    addBotMessage(messages.welcome);
                    chatState.step = 'inicio';
                    showQuickReplies('inicio');
            }
        }

        function sendMessage() {
            const input = document.getElementById('chatInput');
            const text = input.value.trim();
            
            if (!text) return;
            
            addMessage(text, false);
            input.value = '';
            
            setTimeout(() => {
                handleUserInput(text);
            }, 500);
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        function scrollToBottom() {
            const messages = document.getElementById('chatMessages');
            messages.scrollTop = messages.scrollHeight;
        }

        function sendLeadData(data) {
            console.log('Lead data:', data);
            
            if (typeof emailjs !== 'undefined') {
                emailjs.send('service_1my1ljq', 'template_dst3ela', {
                    from_name: data.nombre,
                    from_email: data.email,
                    phone: data.telefono,
                    message: `
Tipo: ${data.tipo}
Empresa: ${data.empresa || 'No especificado'}
Plan Interesado: ${data.plan}
                    `,
                    to_email: 'deislersaid1418@gmail.com'
                }).then(
                    () => console.log('Lead enviado exitosamente'),
                    (error) => console.error('Error enviando lead:', error)
                );
            }
        }

        // Header scroll effect
        let lastScroll = 0;
        const header = document.querySelector('header');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.background = 'rgba(26, 26, 46, 0.98)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)';
            }

            lastScroll = currentScroll;
        });

        // Initialize chat when page loads
        window.addEventListener('load', initChat);