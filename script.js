// @ts-nocheck
(function () {
  var STORAGE_KEY = "efex_app_state_v1";
  var DEVICE_TOKEN_KEY = "efex_device_token_v1";
  var OWNED_HANDLES_KEY = "efex_owned_handles_v1";
  var SUPPORT_EMAIL = "efexsupport@gmail.com";

  var firebaseConfig = {
    apiKey: "AIzaSyB60JaehN8JnWW29NbUyX548WgP6pjLPAk",
    authDomain: "koncord-3d615.firebaseapp.com",
    databaseURL: "https://koncord-3d615-default-rtdb.firebaseio.com",
    projectId: "koncord-3d615",
    storageBucket: "koncord-3d615.firebasestorage.app",
    messagingSenderId: "708348385243",
    appId: "1:708348385243:web:82a2bad9c6b84975f539fe",
    measurementId: "G-GFGFQWB8SZ"
  };

  var db = null;
  var activeChatListener = null;

  if (window.firebase && firebaseConfig.apiKey) {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      db = firebase.database();
    } catch (e) {
      db = null;
      if (window.console && console.error) {
        console.error("Firebase init error:", e);
      }
    }
  }

  var DEFAULT_AVATAR =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">' +
        '<rect width="120" height="120" rx="60" fill="#141414"/>' +
        '<circle cx="60" cy="46" r="20" fill="#737373"/>' +
        '<path d="M24 104c6-20 22-30 36-30s30 10 36 30" fill="#737373"/>' +
      "</svg>"
    );

  var I18N = {
    pt: {
      signInTab: "Entrar",
      signUpTab: "Criar conta",
      savedAccountsLabel: "Sessão recente",
      signInBtn: "Entrar",
      signUpBtn: "Criar conta",
      forgotPassBtn: "Esqueci a senha",
      resetPassTitle: "Redefinir senha",
      confirmResetBtn: "Salvar nova senha",
      backBtn: "Voltar",
      changePassTitle: "Alterar senha",
      savePassBtn: "Atualizar senha",
      curPassPlaceholder: "Senha atual",
      newPassPlaceholder: "Nova senha",
      publish: "Publicar",
      feedTitle: "Feed",
      all: "Todos",
      following: "Seguindo",
      allPosts: "Publicações",
      likesListTitle: "Curtidas",
      chatTitle: "Chat",
      activityTitle: "Atividade",
      nameLabel: "Nome",
      bioLabel: "Bio",
      avatarBtn: "Foto",
      bannerBtn: "Banner",
      save: "Salvar",
      cancel: "Cancelar",
      postsStat: "Posts",
      followersStat: "Seguidores",
      followingStat: "Seguindo",
      myPosts: "Meus Posts",
      accountsTitle: "Conta",
      loginOrCreate: "Entrar / Criar",
      continueBtn: "Continuar",
      settingsTitle: "Configurações",
      themeLabel: "Tema",
      langLabel: "Idioma",
      resetData: "Resetar dados locais",
      supportTitle: "Suporte",
      ticketTopicLabel: "Assunto",
      topicAccount: "Conta",
      topicChat: "Chat",
      topicBug: "Bug",
      supportEmailPlaceholder: "Seu e-mail (opcional)",
      supportMsgPlaceholder: "Descreva o que aconteceu...",
      sendEmailBtn: "E-mail",
      saveTicketBtn: "Registrar",
      copyDiag: "Copiar",
      ticketHistoryLabel: "Chamados salvos",
      emptyTickets: "Nenhum chamado salvo.",
      needSupportMsg: "Escreva uma mensagem primeiro.",
      ticketSaved: "Chamado salvo e copiado!",
      mailOpened: "Copiado e redirecionando para o Gmail...",
      postPlaceholder: "O que está acontecendo?",
      searchPlaceholder: "Buscar perfis (@arroba ou nome)...",
      chatPlaceholder: "Mensagem...",
      mutualRequiredPlaceholder: "Vocês precisam se seguir mutuamente...",
      commentPlaceholder: "Comentar...",
      namePlaceholder: "Nome",
      passPlaceholder: "Senha",
      follow: "Seguir",
      followingBtn: "Seguindo",
      messageBtn: "Mensagem",
      emptyFeed: "Nenhuma publicação por aqui ainda.",
      emptyChat: "Nenhuma mensagem ainda.",
      emptyAct: "Nenhuma atividade registrada.",
      emptyRelations: "Ninguém por aqui ainda.",
      copied: "Status copiado!",
      needHandlePass: "Preencha @arroba e senha.",
      wrongPass: "Senha incorreta.",
      accNotFound: "Conta não encontrada. Mude para Criar conta.",
      accExists: "Esse @arroba já existe. Entre com a senha.",
      passUpdated: "Senha atualizada!",
      passResetDone: "Nova senha salva. Agora entre com ela.",
      ipMismatch: "Bloqueado: o IP atual não confere com o da conta.",
      ipUnavailable: "Bloqueado: não foi possível verificar o IP atual."
    },
    en: {
      signInTab: "Sign in",
      signUpTab: "Sign up",
      savedAccountsLabel: "Recent session",
      signInBtn: "Sign in",
      signUpBtn: "Create account",
      forgotPassBtn: "Forgot password",
      resetPassTitle: "Reset password",
      confirmResetBtn: "Save new password",
      backBtn: "Back",
      changePassTitle: "Change password",
      savePassBtn: "Update password",
      curPassPlaceholder: "Current password",
      newPassPlaceholder: "New password",
      publish: "Post",
      feedTitle: "Feed",
      all: "All",
      following: "Following",
      allPosts: "Posts",
      likesListTitle: "Likes",
      chatTitle: "Chat",
      activityTitle: "Activity",
      nameLabel: "Name",
      bioLabel: "Bio",
      avatarBtn: "Avatar",
      bannerBtn: "Banner",
      save: "Save",
      cancel: "Cancel",
      postsStat: "Posts",
      followersStat: "Followers",
      followingStat: "Following",
      myPosts: "My Posts",
      accountsTitle: "Account",
      loginOrCreate: "Sign in / Create",
      continueBtn: "Continue",
      settingsTitle: "Settings",
      themeLabel: "Theme",
      langLabel: "Language",
      resetData: "Reset local data",
      supportTitle: "Support",
      ticketTopicLabel: "Topic",
      topicAccount: "Account",
      topicChat: "Chat",
      topicBug: "Bug",
      supportEmailPlaceholder: "Your email (optional)",
      supportMsgPlaceholder: "Describe what happened...",
      sendEmailBtn: "Email",
      saveTicketBtn: "Save",
      copyDiag: "Copy",
      ticketHistoryLabel: "Saved tickets",
      emptyTickets: "No saved tickets.",
      needSupportMsg: "Write a message first.",
      ticketSaved: "Ticket saved and copied!",
      mailOpened: "Copied and redirecting to Gmail...",
      postPlaceholder: "What's happening?",
      searchPlaceholder: "Search profiles (@handle or name)...",
      chatPlaceholder: "Message...",
      mutualRequiredPlaceholder: "Mutual follow required to chat...",
      commentPlaceholder: "Comment...",
      namePlaceholder: "Name",
      passPlaceholder: "Password",
      follow: "Follow",
      followingBtn: "Following",
      messageBtn: "Message",
      emptyFeed: "No posts here yet.",
      emptyChat: "No messages yet.",
      emptyAct: "No activity yet.",
      emptyRelations: "Nobody here yet.",
      copied: "Status copied!",
      needHandlePass: "Enter @handle and password.",
      wrongPass: "Wrong password.",
      accNotFound: "Account not found. Switch to Sign up.",
      accExists: "Handle already exists. Sign in with password.",
      passUpdated: "Password updated!",
      passResetDone: "New password saved. Sign in now.",
      ipMismatch: "Blocked: current IP does not match account IP.",
      ipUnavailable: "Blocked: unable to verify current IP."
    },
    es: {
      signInTab: "Entrar",
      signUpTab: "Crear cuenta",
      savedAccountsLabel: "Sesión reciente",
      signInBtn: "Entrar",
      signUpBtn: "Crear cuenta",
      forgotPassBtn: "Olvidé mi contraseña",
      resetPassTitle: "Restablecer contraseña",
      confirmResetBtn: "Guardar nueva contraseña",
      backBtn: "Volver",
      changePassTitle: "Cambiar contraseña",
      savePassBtn: "Actualizar contraseña",
      curPassPlaceholder: "Contraseña actual",
      newPassPlaceholder: "Nueva contraseña",
      publish: "Publicar",
      feedTitle: "Feed",
      all: "Todos",
      following: "Siguiendo",
      allPosts: "Publicaciones",
      likesListTitle: "Me gusta",
      chatTitle: "Chat",
      activityTitle: "Actividad",
      nameLabel: "Nombre",
      bioLabel: "Bio",
      avatarBtn: "Foto",
      bannerBtn: "Banner",
      save: "Guardar",
      cancel: "Cancelar",
      postsStat: "Posts",
      followersStat: "Seguidores",
      followingStat: "Siguiendo",
      myPosts: "Mis Posts",
      accountsTitle: "Cuenta",
      loginOrCreate: "Entrar / Crear",
      continueBtn: "Continuar",
      settingsTitle: "Ajustes",
      themeLabel: "Tema",
      langLabel: "Idioma",
      resetData: "Restablecer datos",
      supportTitle: "Soporte",
      ticketTopicLabel: "Asunto",
      topicAccount: "Cuenta",
      topicChat: "Chat",
      topicBug: "Bug",
      supportEmailPlaceholder: "Tu correo (opcional)",
      supportMsgPlaceholder: "Describe qué pasó...",
      sendEmailBtn: "Correo",
      saveTicketBtn: "Registrar",
      copyDiag: "Copiar",
      ticketHistoryLabel: "Tickets guardados",
      emptyTickets: "Sin tickets guardados.",
      needSupportMsg: "Escribe un mensaje primero.",
      ticketSaved: "¡Ticket guardado y copiado!",
      mailOpened: "Copiado y redirigiendo a Gmail...",
      postPlaceholder: "¿Qué está pasando?",
      searchPlaceholder: "Buscar perfiles (@usuario o nombre)...",
      chatPlaceholder: "Mensaje...",
      mutualRequiredPlaceholder: "Deben seguirse mutuamente...",
      commentPlaceholder: "Comentar...",
      namePlaceholder: "Nombre",
      passPlaceholder: "Contraseña",
      follow: "Seguir",
      followingBtn: "Siguiendo",
      messageBtn: "Mensaje",
      emptyFeed: "Aún no hay publicaciones.",
      emptyChat: "Aún no hay mensajes.",
      emptyAct: "Sin actividad registrada.",
      emptyRelations: "Nadie por aquí aún.",
      copied: "¡Estado copiado!",
      needHandlePass: "Completa @usuario y contraseña.",
      wrongPass: "Contraseña incorrecta.",
      accNotFound: "Cuenta no encontrada. Cambia a Crear cuenta.",
      accExists: "Ese @usuario ya existe. Entra con contraseña.",
      passUpdated: "¡Contraseña actualizada!",
      passResetDone: "Nueva contraseña guardada. Inicia sesión.",
      ipMismatch: "Bloqueado: la IP actual no coincide con la de la cuenta.",
      ipUnavailable: "Bloqueado: no se pudo verificar la IP actual."
    }
  };

  function triggerPopupAnim(el) {
    if (!el) return;
    el.classList.remove("popup-toast");
    void el.offsetWidth;
    el.classList.add("popup-toast");
  }

  function setFeedback(el, msg) {
    if (!el) return;
    el.textContent = msg || "";
    if (msg) triggerPopupAnim(el);
  }

  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove("hidden");
    var card = modal.querySelector(".modal-card");
    if (card) {
      card.style.animation = "none";
      void card.offsetWidth;
      card.style.animation = "";
    }
  }

  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) modal.classList.add("hidden");
  }

  function getDeviceToken() {
    try {
      var tok = localStorage.getItem(DEVICE_TOKEN_KEY);
      if (!tok) {
        tok = "dev_" + Math.random().toString(36).slice(2) + "_" + Date.now().toString(36);
        localStorage.setItem(DEVICE_TOKEN_KEY, tok);
      }
      return tok;
    } catch (e) {
      return "dev_fallback";
    }
  }

  function markHandleAsOwned(handle) {
    var h = normalizeHandle(handle);
    if (!h) return;
    try {
      var raw = localStorage.getItem(OWNED_HANDLES_KEY);
      var list = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(list)) list = [];
      if (list.indexOf(h) === -1) {
        list.push(h);
        localStorage.setItem(OWNED_HANDLES_KEY, JSON.stringify(list));
      }
    } catch (e) {}
  }

  function isOwnedOnThisDevice(handle) {
    var h = normalizeHandle(handle);
    if (!h) return false;
    var acc = state.users[h];
    var myToken = getDeviceToken();
    if (acc && acc.ownerToken && acc.ownerToken === myToken) {
      return true;
    }
    try {
      var raw = localStorage.getItem(OWNED_HANDLES_KEY);
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) && list.indexOf(h) !== -1;
    } catch (e) {
      return false;
    }
  }

  function fetchPublicIp(callback) {
    if (!window.fetch) {
      callback("");
      return;
    }
    fetch("https://api.ipify.org?format=json")
      .then(function (res) {
        return res.ok ? res.json() : null;
      })
      .then(function (data) {
        callback(data && data.ip ? String(data.ip).trim() : "");
      })
      .catch(function () {
        callback("");
      });
  }

  var state = loadState();
  var authMode = "login";
  var resetViewActive = false;
  var supportTopic = "account";
  var feedFilter = "all";
  var activeChatTarget = "efex";
  var viewedProfileHandle = "efex";
  var viewedRelationTab = "followers";
  var pendingPostImage = "";
  var pendingPostVideo = "";
  var pendingChatImage = "";
  var pendingChatVideo = "";
  var pendingAvatar = "";
  var pendingBanner = "";
  var sessionViewedPosts = {};

  function t(key) {
    var lang = state.lang || "pt";
    var dict = I18N[lang] || I18N.pt;
    return dict[key] || I18N.pt[key] || key;
  }

  function fallbackHash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    return "fnv_" + (h >>> 0).toString(16);
  }

  function hashPassword(plain, callback) {
    var raw = String(plain || "");
    if (window.crypto && window.crypto.subtle && window.TextEncoder) {
      var data = new TextEncoder().encode("efex_salt_v1:" + raw);
      window.crypto.subtle
        .digest("SHA-256", data)
        .then(function (buf) {
          var bytes = new Uint8Array(buf);
          var hex = "";
          for (var i = 0; i < bytes.length; i++) {
            var b = bytes[i].toString(16);
            if (b.length < 2) b = "0" + b;
            hex += b;
          }
          callback("sha256_" + hex);
        })
        .catch(function () {
          callback(fallbackHash("efex_salt_v1:" + raw));
        });
    } else {
      callback(fallbackHash("efex_salt_v1:" + raw));
    }
  }

  function createInitialState() {
    return {
      theme: "bw",
      lang: "pt",
      currentHandle: "",
      users: {
        efex: {
          handle: "efex",
          name: "efex",
          passHash: fallbackHash("efex_salt_v1:123"),
          ownerToken: "",
          ownerIp: "",
          bio: "Conta oficial do efex.",
          avatar: DEFAULT_AVATAR,
          banner: "",
          following: []
        }
      },
      posts: [
        {
          id: "p1",
          authorHandle: "efex",
          text: "Bem-vindo ao efex!",
          image: "",
          video: "",
          createdAt: Date.now() - 3600000,
          likes: [],
          comments: [],
          views: 0
        }
      ],
      chats: {},
      tickets: [],
      activities: [
        {
          text: "efex iniciado.",
          time: formatTime(Date.now())
        }
      ]
    };
  }

  function sanitizeUserRecord(rawUser, handleFallback) {
    var h = normalizeHandle(handleFallback || (rawUser && rawUser.handle) || "");
    if (!h) return null;
    var existing = state && state.users && state.users[h] ? state.users[h] : null;
    var hashVal =
      (rawUser && rawUser.passHash) ||
      (existing && existing.passHash) ||
      fallbackHash("efex_salt_v1:" + ((rawUser && rawUser.password) || "123"));

    return {
      handle: h,
      name: (rawUser && rawUser.name) || (existing && existing.name) || h,
      passHash: hashVal,
      ownerToken: (rawUser && rawUser.ownerToken) || (existing && existing.ownerToken) || "",
      ownerIp: (rawUser && rawUser.ownerIp) || (existing && existing.ownerIp) || "",
      bio: (rawUser && typeof rawUser.bio === "string") ? rawUser.bio : ((existing && existing.bio) || ""),
      avatar: (rawUser && rawUser.avatar) || (existing && existing.avatar) || DEFAULT_AVATAR,
      banner: (rawUser && rawUser.banner) || (existing && existing.banner) || "",
      following: Array.isArray(rawUser && rawUser.following)
        ? rawUser.following
        : (existing && Array.isArray(existing.following) ? existing.following : [])
    };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        var init = createInitialState();
        saveStateObj(init);
        return init;
      }
      var parsed = JSON.parse(raw);
      if (!parsed || !parsed.users) {
        return createInitialState();
      }
      var cleanUsers = {};
      for (var k in parsed.users) {
        if (Object.prototype.hasOwnProperty.call(parsed.users, k)) {
          var clean = sanitizeUserRecord(parsed.users[k], k);
          if (clean) cleanUsers[clean.handle] = clean;
        }
      }
      if (!cleanUsers.efex) {
        cleanUsers.efex = createInitialState().users.efex;
      }
      parsed.users = cleanUsers;
      if (!parsed.chats) parsed.chats = {};
      if (!parsed.tickets) parsed.tickets = [];
      if (!parsed.activities) parsed.activities = [];
      if (!parsed.posts) parsed.posts = [];
      for (var pIdx = 0; pIdx < parsed.posts.length; pIdx++) {
        if (typeof parsed.posts[pIdx].views !== "number") {
          parsed.posts[pIdx].views = 0;
        }
      }
      if (!parsed.theme) parsed.theme = "bw";
      if (!parsed.lang) parsed.lang = "pt";
      if (typeof parsed.currentHandle !== "string") parsed.currentHandle = "";
      return parsed;
    } catch (e) {
      return createInitialState();
    }
  }

  function saveStateObj(obj) {
    try {
      var safeCopy = {
        theme: obj.theme || "bw",
        lang: obj.lang || "pt",
        currentHandle: obj.currentHandle || "",
        users: {},
        posts: obj.posts || [],
        chats: obj.chats || {},
        tickets: obj.tickets || [],
        activities: obj.activities || []
      };
      for (var k in obj.users) {
        if (Object.prototype.hasOwnProperty.call(obj.users, k)) {
          var u = obj.users[k];
          safeCopy.users[k] = {
            handle: u.handle,
            name: u.name,
            passHash: u.passHash,
            ownerToken: u.ownerToken || "",
            ownerIp: u.ownerIp || "",
            bio: u.bio || "",
            avatar: u.avatar || DEFAULT_AVATAR,
            banner: u.banner || "",
            following: u.following || []
          };
        }
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safeCopy));
    } catch (e) {}
  }

  function saveState() {
    saveStateObj(state);
  }

  function syncUserToFirebase(userObj) {
    if (!db || !userObj || !userObj.handle) return;
    var payload = {
      handle: userObj.handle,
      name: userObj.name || userObj.handle,
      passHash: userObj.passHash || "",
      ownerToken: userObj.ownerToken || "",
      ownerIp: userObj.ownerIp || "",
      bio: userObj.bio || "",
      avatar: userObj.avatar && userObj.avatar.length < 700000 ? userObj.avatar : DEFAULT_AVATAR,
      banner: userObj.banner && userObj.banner.length < 700000 ? userObj.banner : "",
      following: userObj.following || []
    };
    db.ref("users/" + userObj.handle).set(payload).catch(function (err) {
      if (window.console && console.error) {
        console.error("Firebase user sync error:", err);
      }
    });
  }

  function syncPostToFirebase(postObj) {
    if (!db || !postObj || !postObj.id) return;
    var fbPost = {
      id: postObj.id,
      authorHandle: postObj.authorHandle,
      text: postObj.text || "",
      image: postObj.image && postObj.image.length < 850000 ? postObj.image : "",
      video: postObj.video && postObj.video.indexOf("blob:") !== 0 && postObj.video.length < 1800000 ? postObj.video : "",
      createdAt: postObj.createdAt || Date.now(),
      likes: postObj.likes || [],
      comments: postObj.comments || [],
      views: typeof postObj.views === "number" ? postObj.views : 0
    };
    db.ref("posts/" + postObj.id).set(fbPost).catch(function (err) {
      if (window.console && console.error) {
        console.error("Firebase post sync error:", err);
      }
    });
  }

  function subscribeRemoteData() {
    if (!db) return;

    db.ref("users").on("value", function (snapshot) {
      var changed = false;
      snapshot.forEach(function (child) {
        var val = child.val();
        var clean = sanitizeUserRecord(val, child.key);
        if (clean) {
          var prev = state.users[clean.handle];
          if (!prev || JSON.stringify(prev) !== JSON.stringify(clean)) {
            state.users[clean.handle] = clean;
            changed = true;
          }
        }
      });
      if (changed) {
        saveState();
        if (getCurrentUser()) renderAll();
      }
    });

    db.ref("posts").on("value", function (snapshot) {
      var list = [];
      snapshot.forEach(function (child) {
        var p = child.val();
        if (p && p.id && p.authorHandle) {
          list.push({
            id: p.id,
            authorHandle: p.authorHandle,
            text: p.text || "",
            image: p.image || "",
            video: p.video || "",
            createdAt: p.createdAt || Date.now(),
            likes: Array.isArray(p.likes) ? p.likes : [],
            comments: Array.isArray(p.comments) ? p.comments : [],
            views: typeof p.views === "number" ? p.views : 0
          });
        }
      });
      if (list.length > 0) {
        list.sort(function (a, b) {
          return (b.createdAt || 0) - (a.createdAt || 0);
        });
        state.posts = list;
        saveState();
        if (getCurrentUser()) {
          renderFeed();
          renderPostsTab();
          renderProfile();
        }
      }
    });
  }

  function getCurrentUser() {
    if (!state.currentHandle || !state.users[state.currentHandle]) {
      return null;
    }
    return state.users[state.currentHandle];
  }

  function normalizeHandle(raw) {
    return String(raw || "")
      .trim()
      .toLowerCase()
      .replace(/^@+/, "")
      .replace(/[^a-z0-9_.-]/g, "");
  }

  function formatTime(ts) {
    var d = new Date(ts);
    var hh = String(d.getHours());
    var mm = String(d.getMinutes());
    if (hh.length < 2) hh = "0" + hh;
    if (mm.length < 2) mm = "0" + mm;
    return hh + ":" + mm;
  }

  function addActivity(text) {
    state.activities.unshift({
      text: text,
      time: formatTime(Date.now())
    });
    if (state.activities.length > 50) {
      state.activities = state.activities.slice(0, 50);
    }
    saveState();
  }

  function readImageFile(file, callback) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      callback(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  function readVideoFile(file, callback) {
    if (!file) return;
    if (file.size > 6 * 1024 * 1024 && window.URL && URL.createObjectURL) {
      callback(URL.createObjectURL(file));
      return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      callback(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  function sanitizeMediaUrl(raw) {
    var clean = String(raw || "").trim();
    if (!clean) return "";
    if (/^(https?:\/\/|data:video\/|blob:)/i.test(clean)) {
      return clean;
    }
    return "";
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    }
  }

  function syncAuthGate() {
    var user = getCurrentUser();
    var gateEl = document.getElementById("authGate");
    var shellEl = document.getElementById("appShell");

    if (!user) {
      gateEl.classList.remove("hidden");
      shellEl.classList.add("hidden");
      renderGateSavedAccounts();
      applyGateModeUI();
    } else {
      gateEl.classList.add("hidden");
      shellEl.classList.remove("hidden");
      renderAll();
    }
  }

  function applyGateModeUI() {
    var loginTab = document.getElementById("tabModeLogin");
    var signupTab = document.getElementById("tabModeSignup");
    var authForm = document.getElementById("gateAuthForm");
    var resetBox = document.getElementById("gateResetBox");
    var nameInput = document.getElementById("gateNameInput");
    var submitBtn = document.getElementById("btnGateSubmit");

    if (resetViewActive) {
      authForm.classList.add("hidden");
      resetBox.classList.remove("hidden");
      triggerPopupAnim(resetBox);
    } else {
      authForm.classList.remove("hidden");
      resetBox.classList.add("hidden");

      if (authMode === "signup") {
        loginTab.classList.remove("active");
        signupTab.classList.add("active");
        nameInput.classList.remove("hidden");
        submitBtn.textContent = t("signUpBtn");
      } else {
        authMode = "login";
        loginTab.classList.add("active");
        signupTab.classList.remove("active");
        nameInput.classList.add("hidden");
        submitBtn.textContent = t("signInBtn");
      }
    }

    nameInput.placeholder = t("namePlaceholder");
    document.getElementById("gatePassInput").placeholder = t("passPlaceholder");
    document.getElementById("resetNewPassInput").placeholder = t("newPassPlaceholder");
  }

  function renderGateSavedAccounts() {
    var wrap = document.getElementById("gateSavedAccountsWrap");
    var listEl = document.getElementById("gateSavedAccountsList");
    listEl.innerHTML = "";

    var lastHandle = normalizeHandle(state.currentHandle || "");
    if (!lastHandle || !state.users[lastHandle]) {
      wrap.classList.add("hidden");
      return;
    }

    var acc = state.users[lastHandle];
    wrap.classList.remove("hidden");
    var row = document.createElement("div");
    row.className = "account-row";
    row.innerHTML =
      "<div><strong>" + escapeHtml(acc.name) + '</strong> <span class="muted">@' + escapeHtml(acc.handle) + "</span></div>" +
      '<button class="btn btn-secondary btn-sm js-prefill-handle" data-handle="' + escapeHtml(acc.handle) + '" type="button">@</button>';
    listEl.appendChild(row);

    var btns = listEl.querySelectorAll(".js-prefill-handle");
    for (var j = 0; j < btns.length; j++) {
      btns[j].addEventListener("click", function () {
        var h = "@" + this.getAttribute("data-handle");
        document.getElementById("gateHandleInput").value = h;
        document.getElementById("resetHandleInput").value = h;
        if (resetViewActive) {
          document.getElementById("resetNewPassInput").focus();
        } else {
          document.getElementById("gatePassInput").focus();
        }
      });
    }
  }

  document.getElementById("tabModeLogin").addEventListener("click", function () {
    authMode = "login";
    resetViewActive = false;
    setFeedback(document.getElementById("gateFeedback"), "");
    applyGateModeUI();
  });

  document.getElementById("tabModeSignup").addEventListener("click", function () {
    authMode = "signup";
    resetViewActive = false;
    setFeedback(document.getElementById("gateFeedback"), "");
    applyGateModeUI();
  });

  document.getElementById("btnToggleForgotPass").addEventListener("click", function () {
    resetViewActive = true;
    document.getElementById("resetHandleInput").value =
      document.getElementById("gateHandleInput").value;
    setFeedback(document.getElementById("gateFeedback"), "");
    applyGateModeUI();
  });

  document.getElementById("btnBackToAuth").addEventListener("click", function () {
    resetViewActive = false;
    setFeedback(document.getElementById("gateFeedback"), "");
    applyGateModeUI();
  });

  document.getElementById("btnGateResetConfirm").addEventListener("click", function () {
    var handle = normalizeHandle(document.getElementById("resetHandleInput").value);
    var newPass = document.getElementById("resetNewPassInput").value;
    var feedback = document.getElementById("gateFeedback");

    if (!handle || !newPass) {
      setFeedback(feedback, t("needHandlePass"));
      return;
    }

    var acc = state.users[handle];
    if (!acc) {
      setFeedback(feedback, t("accNotFound"));
      return;
    }

    fetchPublicIp(function (currentIp) {
      if (!currentIp) {
        setFeedback(feedback, t("ipUnavailable"));
        return;
      }

      if (acc.ownerIp && acc.ownerIp !== currentIp) {
        setFeedback(feedback, t("ipMismatch"));
        addActivity("Tentativa bloqueada por IP em @" + handle + " (" + currentIp + ")");
        saveState();
        return;
      }

      if (!acc.ownerIp && !isOwnedOnThisDevice(handle)) {
        setFeedback(feedback, t("ipMismatch"));
        addActivity("Tentativa bloqueada em @" + handle);
        saveState();
        return;
      }

      hashPassword(newPass, function (digest) {
        acc.passHash = digest;
        acc.ownerIp = currentIp;
        acc.ownerToken = getDeviceToken();
        markHandleAsOwned(handle);
        document.getElementById("resetNewPassInput").value = "";
        document.getElementById("gateHandleInput").value = "@" + handle;
        document.getElementById("gatePassInput").value = "";

        addActivity("Senha redefinida: @" + handle);
        saveState();
        syncUserToFirebase(acc);

        resetViewActive = false;
        authMode = "login";
        applyGateModeUI();
        setFeedback(feedback, t("passResetDone"));
      });
    });
  });

  document.getElementById("btnGateSubmit").addEventListener("click", function () {
    var handle = normalizeHandle(document.getElementById("gateHandleInput").value);
    var name = document.getElementById("gateNameInput").value.trim();
    var pass = document.getElementById("gatePassInput").value;
    var feedback = document.getElementById("gateFeedback");

    if (!handle || !pass) {
      setFeedback(feedback, t("needHandlePass"));
      return;
    }

    fetchPublicIp(function (currentIp) {
      hashPassword(pass, function (digest) {
        if (authMode === "signup") {
          if (state.users[handle]) {
            setFeedback(feedback, t("accExists"));
            return;
          }
          var newAcc = {
            handle: handle,
            name: name || handle,
            passHash: digest,
            ownerToken: getDeviceToken(),
            ownerIp: currentIp || "",
            bio: "",
            avatar: DEFAULT_AVATAR,
            banner: "",
            following: []
          };
          state.users[handle] = newAcc;
          state.currentHandle = handle;
          markHandleAsOwned(handle);
          addActivity("Nova conta: @" + handle);
          syncUserToFirebase(newAcc);
        } else {
          if (!state.users[handle]) {
            setFeedback(feedback, t("accNotFound"));
            return;
          }
          if (state.users[handle].passHash !== digest) {
            setFeedback(feedback, t("wrongPass"));
            return;
          }
          if (!state.users[handle].ownerIp && currentIp) {
            state.users[handle].ownerIp = currentIp;
            syncUserToFirebase(state.users[handle]);
          }
          state.currentHandle = handle;
          addActivity("@" + handle + " entrou.");
        }

        document.getElementById("gateHandleInput").value = "";
        document.getElementById("gateNameInput").value = "";
        document.getElementById("gatePassInput").value = "";
        setFeedback(feedback, "");

        saveState();
        syncAuthGate();
      });
    });
  });

  function applyThemeAndLang() {
    document.body.className = "theme-" + (state.theme || "bw");

    var themeTiles = document.querySelectorAll(".js-theme-opt");
    for (var i = 0; i < themeTiles.length; i++) {
      var isCurTheme = themeTiles[i].getAttribute("data-theme") === state.theme;
      themeTiles[i].classList.toggle("active", isCurTheme);
    }

    var langTiles = document.querySelectorAll(".js-lang-opt");
    for (var j = 0; j < langTiles.length; j++) {
      var isCurLang = langTiles[j].getAttribute("data-lang") === state.lang;
      langTiles[j].classList.toggle("active", isCurLang);
    }

    var topicTiles = document.querySelectorAll(".js-sup-topic");
    for (var m = 0; m < topicTiles.length; m++) {
      var isCurTopic = topicTiles[m].getAttribute("data-topic") === supportTopic;
      topicTiles[m].classList.toggle("active", isCurTopic);
    }

    var i18nNodes = document.querySelectorAll("[data-i18n]");
    for (var k = 0; k < i18nNodes.length; k++) {
      var key = i18nNodes[k].getAttribute("data-i18n");
      if (key === "signInBtn" && authMode === "signup") {
        i18nNodes[k].textContent = t("signUpBtn");
      } else {
        i18nNodes[k].textContent = t(key);
      }
    }

    var searchInp = document.getElementById("profileSearchInput");
    if (searchInp) searchInp.placeholder = t("searchPlaceholder");
    document.getElementById("postText").placeholder = t("postPlaceholder");
    document.getElementById("chatMessageInput").placeholder = t("chatPlaceholder");
    document.getElementById("gateNameInput").placeholder = t("namePlaceholder");
    document.getElementById("gatePassInput").placeholder = t("passPlaceholder");
    document.getElementById("resetNewPassInput").placeholder = t("newPassPlaceholder");
    document.getElementById("curPassInput").placeholder = t("curPassPlaceholder");
    document.getElementById("newPassInput").placeholder = t("newPassPlaceholder");
    document.getElementById("supportEmailInput").placeholder = t("supportEmailPlaceholder");
    document.getElementById("supportMsgInput").placeholder = t("supportMsgPlaceholder");
  }

  var navButtons = document.querySelectorAll(".nav-btn");
  for (var i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener("click", function () {
      switchTab(this.getAttribute("data-tab"));
    });
  }

  function switchTab(tabName) {
    var views = document.querySelectorAll(".tab-view");
    for (var i = 0; i < views.length; i++) {
      views[i].classList.remove("active");
    }
    for (var j = 0; j < navButtons.length; j++) {
      navButtons[j].classList.toggle(
        "active",
        navButtons[j].getAttribute("data-tab") === tabName
      );
    }
    var targetEl = document.getElementById("tab-" + tabName);
    if (targetEl) {
      targetEl.classList.add("active");
      triggerPopupAnim(targetEl);
    }
    renderAll();
  }

  var profileSearchInput = document.getElementById("profileSearchInput");
  var profileSearchResults = document.getElementById("profileSearchResults");

  function renderProfileSuggestions(queryRaw) {
    if (!profileSearchInput || !profileSearchResults) return;

    var currentUser = getCurrentUser();
    var cleanQuery = String(queryRaw || "")
      .trim()
      .toLowerCase()
      .replace(/^@+/, "");

    var matches = [];
    for (var h in state.users) {
      if (!Object.prototype.hasOwnProperty.call(state.users, h)) continue;
      var u = state.users[h];
      if (!u || !u.handle) continue;
      if (currentUser && u.handle === currentUser.handle) continue;

      var haystack = (u.handle + " " + (u.name || "")).toLowerCase();
      if (!cleanQuery || haystack.indexOf(cleanQuery) !== -1) {
        matches.push(u);
      }
    }

    matches.sort(function (a, b) {
      if (a.handle === "efex") return -1;
      if (b.handle === "efex") return 1;
      return String(a.handle).localeCompare(String(b.handle));
    });

    profileSearchResults.innerHTML = "";

    if (!matches.length) {
      profileSearchResults.innerHTML = '<div class="empty-state">Nenhum perfil encontrado.</div>';
      profileSearchResults.classList.remove("hidden");
      return;
    }

    var limited = matches.slice(0, 6);
    for (var idx = 0; idx < limited.length; idx++) {
      var prof = limited[idx];
      var isFollowing =
        currentUser &&
        Array.isArray(currentUser.following) &&
        currentUser.following.indexOf(prof.handle) !== -1;

      var row = document.createElement("div");
      row.className = "search-profile-row";
      row.innerHTML =
        '<button class="search-profile-btn js-open-search-prof" data-handle="' + escapeHtml(prof.handle) + '" type="button">' +
          '<img class="post-avatar" src="' + (prof.avatar || DEFAULT_AVATAR) + '" alt="Avatar">' +
          '<div class="search-profile-info">' +
            '<span class="search-profile-name">' + escapeHtml(prof.name || prof.handle) + "</span>" +
            '<span class="muted">@' + escapeHtml(prof.handle) + "</span>" +
          "</div>" +
        "</button>" +
        (currentUser
          ? '<button class="btn ' +
            (isFollowing ? "btn-secondary" : "btn-primary") +
            ' btn-sm js-search-follow" data-handle="' +
            escapeHtml(prof.handle) +
            '" type="button">' +
            (isFollowing ? t("followingBtn") : t("follow")) +
            "</button>"
          : "");

      profileSearchResults.appendChild(row);
    }

    var openBtns = profileSearchResults.querySelectorAll(".js-open-search-prof");
    for (var j = 0; j < openBtns.length; j++) {
      openBtns[j].addEventListener("click", function () {
        var targetH = this.getAttribute("data-handle");
        profileSearchResults.classList.add("hidden");
        openUserProfileModal(targetH, "followers");
      });
    }

    var followBtns = profileSearchResults.querySelectorAll(".js-search-follow");
    for (var k = 0; k < followBtns.length; k++) {
      followBtns[k].addEventListener("click", function (ev) {
        ev.stopPropagation();
        toggleFollow(this.getAttribute("data-handle"));
        renderProfileSuggestions(profileSearchInput.value);
      });
    }

    profileSearchResults.classList.remove("hidden");
  }

  if (profileSearchInput && profileSearchResults) {
    profileSearchInput.addEventListener("focus", function () {
      renderProfileSuggestions(this.value);
    });

    profileSearchInput.addEventListener("input", function () {
      renderProfileSuggestions(this.value);
    });

    document.addEventListener("click", function (ev) {
      if (
        !profileSearchInput.contains(ev.target) &&
        !profileSearchResults.contains(ev.target)
      ) {
        profileSearchResults.classList.add("hidden");
      }
    });
  }

  document.getElementById("filterAll").addEventListener("click", function () {
    feedFilter = "all";
    this.classList.add("active");
    document.getElementById("filterFollowing").classList.remove("active");
    renderFeed();
  });

  document.getElementById("filterFollowing").addEventListener("click", function () {
    feedFilter = "following";
    this.classList.add("active");
    document.getElementById("filterAll").classList.remove("active");
    renderFeed();
  });

  document.getElementById("postImageInput").addEventListener("change", function () {
    readImageFile(this.files[0], function (dataUrl) {
      pendingPostImage = dataUrl;
      document.getElementById("postImagePreview").src = dataUrl;
      var wrap = document.getElementById("postImagePreviewWrap");
      wrap.classList.remove("hidden");
      triggerPopupAnim(wrap);
    });
  });

  document.getElementById("btnRemovePostImage").addEventListener("click", function () {
    pendingPostImage = "";
    document.getElementById("postImageInput").value = "";
    document.getElementById("postImagePreviewWrap").classList.add("hidden");
  });

  var postVideoInput = document.getElementById("postVideoInput");
  var btnPickPostVideo = document.getElementById("btnPickPostVideo");
  var btnRemovePostVideo = document.getElementById("btnRemovePostVideo");

  if (btnPickPostVideo && postVideoInput) {
    btnPickPostVideo.addEventListener("click", function () {
      postVideoInput.click();
    });
  }

  if (postVideoInput) {
    postVideoInput.addEventListener("change", function () {
      readVideoFile(this.files[0], function (videoSrc) {
        pendingPostVideo = videoSrc;
        var prev = document.getElementById("postVideoPreview");
        var wrap = document.getElementById("postVideoPreviewWrap");
        if (prev) prev.src = videoSrc;
        if (wrap) {
          wrap.classList.remove("hidden");
          triggerPopupAnim(wrap);
        }
      });
    });
  }

  if (btnRemovePostVideo) {
    btnRemovePostVideo.addEventListener("click", function () {
      pendingPostVideo = "";
      if (postVideoInput) postVideoInput.value = "";
      var prev = document.getElementById("postVideoPreview");
      var wrap = document.getElementById("postVideoPreviewWrap");
      if (prev) prev.src = "";
      if (wrap) wrap.classList.add("hidden");
    });
  }

  document.getElementById("btnPublishPost").addEventListener("click", function () {
    var user = getCurrentUser();
    if (!user) {
      syncAuthGate();
      return;
    }
    var textEl = document.getElementById("postText");
    var text = textEl.value.trim();
    if (!text && !pendingPostImage && !pendingPostVideo) return;

    var newPost = {
      id: "p_" + Date.now(),
      authorHandle: user.handle,
      text: text,
      image: pendingPostImage,
      video: pendingPostVideo,
      createdAt: Date.now(),
      likes: [],
      comments: [],
      views: 0
    };

    state.posts.unshift(newPost);

    textEl.value = "";
    pendingPostImage = "";
    pendingPostVideo = "";
    document.getElementById("postImageInput").value = "";
    document.getElementById("postImagePreviewWrap").classList.add("hidden");
    if (postVideoInput) postVideoInput.value = "";
    var vidPrev = document.getElementById("postVideoPreview");
    var vidWrap = document.getElementById("postVideoPreviewWrap");
    if (vidPrev) vidPrev.src = "";
    if (vidWrap) vidWrap.classList.add("hidden");

    addActivity("@" + user.handle + " postou.");
    saveState();
    syncPostToFirebase(newPost);
    renderAll();
  });

  function registerPostView(post) {
    if (!post || !post.id) return;
    if (typeof post.views !== "number") post.views = 0;
    if (!sessionViewedPosts[post.id]) {
      sessionViewedPosts[post.id] = true;
      post.views += 1;
      saveState();
      syncPostToFirebase(post);
    }
  }

  function toggleLike(postId) {
    var user = getCurrentUser();
    if (!user) return;
    var updatedPost = null;
    for (var i = 0; i < state.posts.length; i++) {
      if (state.posts[i].id === postId) {
        var likes = state.posts[i].likes;
        var idx = likes.indexOf(user.handle);
        if (idx === -1) {
          likes.push(user.handle);
        } else {
          likes.splice(idx, 1);
        }
        updatedPost = state.posts[i];
        break;
      }
    }
    saveState();
    if (updatedPost) syncPostToFirebase(updatedPost);
    renderAll();
  }

  function openLikesModal(postId) {
    var post = null;
    for (var i = 0; i < state.posts.length; i++) {
      if (state.posts[i].id === postId) {
        post = state.posts[i];
        break;
      }
    }
    var listEl = document.getElementById("likesUsersList");
    listEl.innerHTML = "";

    var likes = post && Array.isArray(post.likes) ? post.likes : [];
    if (!likes.length) {
      listEl.innerHTML = '<div class="empty-state">' + t("emptyRelations") + "</div>";
    } else {
      for (var j = 0; j < likes.length; j++) {
        var h = normalizeHandle(likes[j]);
        var u = state.users[h] || { handle: h, name: h };
        var row = document.createElement("div");
        row.className = "account-row";
        row.innerHTML =
          "<div><strong>" + escapeHtml(u.name) + '</strong> <span class="muted">@' + escapeHtml(h) + "</span></div>" +
          '<button class="btn btn-secondary btn-sm js-like-user-open" data-handle="' + escapeHtml(h) + '" type="button">@</button>';
        listEl.appendChild(row);
      }
      var btns = listEl.querySelectorAll(".js-like-user-open");
      for (var k = 0; k < btns.length; k++) {
        btns[k].addEventListener("click", function () {
          closeModal("likesModal");
          openUserProfileModal(this.getAttribute("data-handle"), "followers");
        });
      }
    }

    openModal("likesModal");
  }

  document.getElementById("btnCloseLikesModal").addEventListener("click", function () {
    closeModal("likesModal");
  });

  function addComment(postId, text) {
    var user = getCurrentUser();
    if (!user) return;
    var clean = String(text || "").trim();
    if (!clean) return;

    var updatedPost = null;
    for (var i = 0; i < state.posts.length; i++) {
      if (state.posts[i].id === postId) {
        state.posts[i].comments.push({
          authorHandle: user.handle,
          text: clean
        });
        updatedPost = state.posts[i];
        break;
      }
    }
    saveState();
    if (updatedPost) syncPostToFirebase(updatedPost);
    renderAll();
  }

  function deletePost(postId) {
    var user = getCurrentUser();
    if (!user) return;
    var next = [];
    for (var i = 0; i < state.posts.length; i++) {
      if (state.posts[i].id === postId && state.posts[i].authorHandle === user.handle) {
        continue;
      }
      next.push(state.posts[i]);
    }
    state.posts = next;
    saveState();
    if (db) {
      db.ref("posts/" + postId).remove();
    }
    renderAll();
  }

  function toggleFollow(targetHandle) {
    var user = getCurrentUser();
    var cleanTarget = normalizeHandle(targetHandle);
    if (!user || !cleanTarget || user.handle === cleanTarget) return;
    if (!Array.isArray(user.following)) user.following = [];
    var idx = user.following.indexOf(cleanTarget);
    if (idx === -1) {
      user.following.push(cleanTarget);
      addActivity("@" + user.handle + " seguiu @" + cleanTarget);
    } else {
      user.following.splice(idx, 1);
      addActivity("@" + user.handle + " deixou de seguir @" + cleanTarget);
    }
    saveState();
    syncUserToFirebase(user);
    renderAll();
    if (!document.getElementById("userProfileModal").classList.contains("hidden")) {
      renderUserProfileModal(viewedProfileHandle);
    }
  }

  function getFollowersList(handle) {
    var clean = normalizeHandle(handle);
    var res = [];
    for (var key in state.users) {
      if (Object.prototype.hasOwnProperty.call(state.users, key)) {
        var u = state.users[key];
        if (u.following && u.following.indexOf(clean) !== -1) {
          res.push(u.handle);
        }
      }
    }
    return res;
  }

  function getFollowingList(handle) {
    var clean = normalizeHandle(handle);
    var u = state.users[clean];
    return u && Array.isArray(u.following) ? u.following.slice() : [];
  }

  function countFollowers(handle) {
    return getFollowersList(handle).length;
  }

  function isMutualFollow(h1, h2) {
    var a = normalizeHandle(h1);
    var b = normalizeHandle(h2);
    if (!a || !b) return false;
    if (a === b) return true;
    var u1 = state.users[a];
    var u2 = state.users[b];
    if (!u1 || !u2) return false;
    var f1 = Array.isArray(u1.following) && u1.following.indexOf(b) !== -1;
    var f2 = Array.isArray(u2.following) && u2.following.indexOf(a) !== -1;
    return f1 && f2;
  }

  function buildPostElement(post) {
    registerPostView(post);

    var currentUser = getCurrentUser();
    var author = state.users[post.authorHandle] || {
      handle: post.authorHandle,
      name: post.authorHandle,
      avatar: DEFAULT_AVATAR
    };

    var isOwner = currentUser && currentUser.handle === post.authorHandle;
    var isLiked = currentUser && post.likes.indexOf(currentUser.handle) !== -1;
    var isFollowing =
      currentUser &&
      !isOwner &&
      currentUser.following.indexOf(post.authorHandle) !== -1;

    var postNum = String(post.id || "").replace(/\D/g, "").slice(-5) || "0001";

    var card = document.createElement("div");
    card.className = "post-card";

    var rightButtonHtml = "";
    if (isOwner) {
      rightButtonHtml =
        '<button class="icon-btn js-delete-post" data-id="' + post.id + '" type="button" title="Apagar">x</button>';
    } else if (currentUser) {
      rightButtonHtml =
        '<button class="btn ' +
        (isFollowing ? "btn-secondary" : "btn-primary") +
        ' btn-sm js-follow-btn" data-handle="' +
        escapeHtml(post.authorHandle) +
        '" type="button">' +
        (isFollowing ? t("followingBtn") : t("follow")) +
        "</button>";
    }

    var imageHtml = post.image
      ? '<img class="post-image" src="' + post.image + '" alt="Post">'
      : "";

    var safeVid = sanitizeMediaUrl(post.video);
    var videoHtml = safeVid
      ? '<video class="post-video" src="' + safeVid + '" controls playsinline preload="metadata"></video>'
      : "";

    var commentsHtml = "";
    for (var c = 0; c < post.comments.length; c++) {
      var cm = post.comments[c];
      commentsHtml +=
        '<div class="comment-item"><strong>@' +
        escapeHtml(cm.authorHandle) +
        ":</strong> " +
        escapeHtml(cm.text) +
        "</div>";
    }

    card.innerHTML =
      '<div class="post-header">' +
        '<button class="post-author link-btn js-open-author" data-handle="' + escapeHtml(post.authorHandle) + '" type="button">' +
          '<img class="post-avatar" src="' + (author.avatar || DEFAULT_AVATAR) + '" alt="Avatar">' +
          "<div>" +
            '<div class="post-author-name">' + escapeHtml(author.name) + "</div>" +
            '<div class="post-author-meta">@' + escapeHtml(author.handle) + " &middot; " + formatTime(post.createdAt) + " &middot; No." + escapeHtml(postNum) + "</div>" +
          "</div>" +
        "</button>" +
        rightButtonHtml +
      "</div>" +
      (post.text ? '<div class="post-body">' + escapeHtml(post.text) + "</div>" : "") +
      imageHtml +
      videoHtml +
      '<div class="post-actions">' +
        '<button class="action-chip js-like-btn ' + (isLiked ? "liked" : "") + '" data-id="' + post.id + '" type="button">' +
          "<span>♥ " + post.likes.length + "</span>" +
        "</button>" +
        '<button class="action-chip js-open-likes" data-id="' + post.id + '" type="button">' +
          "<span>" + t("likesListTitle") + "</span>" +
        "</button>" +
        '<span class="action-chip">' +
          "<span>💬 " + post.comments.length + "</span>" +
        "</span>" +
        '<span class="action-chip views-chip">' +
          "<span>👁 " + (post.views || 0) + "</span>" +
        "</span>" +
      "</div>" +
      '<div class="comments-box">' +
        commentsHtml +
        '<div class="comment-form">' +
          '<input type="text" class="js-comment-input" placeholder="' + escapeHtml(t("commentPlaceholder")) + '">' +
          '<button class="icon-btn js-comment-send" data-id="' + post.id + '" type="button" aria-label="Enviar">→</button>' +
        "</div>" +
      "</div>";

    card.querySelector(".js-open-author").addEventListener("click", function () {
      openUserProfileModal(this.getAttribute("data-handle"), "followers");
    });

    card.querySelector(".js-like-btn").addEventListener("click", function () {
      toggleLike(this.getAttribute("data-id"));
    });

    card.querySelector(".js-open-likes").addEventListener("click", function () {
      openLikesModal(this.getAttribute("data-id"));
    });

    var delBtn = card.querySelector(".js-delete-post");
    if (delBtn) {
      delBtn.addEventListener("click", function () {
        deletePost(this.getAttribute("data-id"));
      });
    }

    var followBtn = card.querySelector(".js-follow-btn");
    if (followBtn) {
      followBtn.addEventListener("click", function () {
        toggleFollow(this.getAttribute("data-handle"));
      });
    }

    var commentInput = card.querySelector(".js-comment-input");
    card.querySelector(".js-comment-send").addEventListener("click", function () {
      addComment(this.getAttribute("data-id"), commentInput.value);
    });

    return card;
  }

  function renderPostList(containerEl, posts, emptyMsg) {
    containerEl.innerHTML = "";
    if (!posts.length) {
      containerEl.innerHTML = '<div class="empty-state">' + emptyMsg + "</div>";
      return;
    }
    for (var i = 0; i < posts.length; i++) {
      containerEl.appendChild(buildPostElement(posts[i]));
    }
  }

  function renderFeed() {
    var listEl = document.getElementById("feedList");
    var currentUser = getCurrentUser();
    var filtered = [];

    for (var i = 0; i < state.posts.length; i++) {
      var p = state.posts[i];
      if (feedFilter === "following" && currentUser) {
        if (
          p.authorHandle === currentUser.handle ||
          (currentUser.following && currentUser.following.indexOf(p.authorHandle) !== -1)
        ) {
          filtered.push(p);
        }
      } else {
        filtered.push(p);
      }
    }

    renderPostList(listEl, filtered, t("emptyFeed"));
  }

  function renderPostsTab() {
    renderPostList(document.getElementById("postsTabList"), state.posts, t("emptyFeed"));
  }

  function getChatKey(h1, h2) {
    return [normalizeHandle(h1), normalizeHandle(h2)].sort().join("__");
  }

  function updateChatMutualState() {
    var user = getCurrentUser();
    var input = document.getElementById("chatMessageInput");
    var sendBtn = document.getElementById("btnSendChat");
    var imgBtn = document.getElementById("btnPickChatImage");
    var vidBtn = document.getElementById("btnPickChatVideo");
    var fb = document.getElementById("chatFeedback");
    if (!user || !input || !sendBtn) return;

    var mutual = isMutualFollow(user.handle, activeChatTarget);
    input.disabled = !mutual;
    sendBtn.disabled = !mutual;
    if (imgBtn) imgBtn.disabled = !mutual;
    if (vidBtn) vidBtn.disabled = !mutual;

    if (!mutual) {
      input.placeholder = t("mutualRequiredPlaceholder");
      if (fb) {
        setFeedback(fb, "Vocês precisam se seguir mutuamente para conversar no chat.");
      }
    } else {
      input.placeholder = t("chatPlaceholder");
      if (fb && fb.textContent.indexOf("se seguir mutuamente") !== -1) {
        setFeedback(fb, "");
      }
    }
  }

  function drawChatMessages(key) {
    var user = getCurrentUser();
    if (!user) return;

    var msgList = document.getElementById("chatMessagesList");
    msgList.innerHTML = "";

    var msgs = state.chats[key] || [];
    if (!msgs.length) {
      msgList.innerHTML = '<div class="empty-state">' + t("emptyChat") + "</div>";
      return;
    }

    for (var m = 0; m < msgs.length; m++) {
      var item = msgs[m];
      var bubble = document.createElement("div");
      bubble.className = "chat-bubble" + (item.from === user.handle ? " mine" : "");

      var textPart = item.text ? "<div>" + escapeHtml(item.text) + "</div>" : "";
      var imgPart = item.image
        ? '<img class="chat-image" src="' + item.image + '" alt="Foto">'
        : "";
      var safeChatVid = sanitizeMediaUrl(item.video);
      var vidPart = safeChatVid
        ? '<video class="chat-video" src="' + safeChatVid + '" controls playsinline preload="metadata"></video>'
        : "";

      bubble.innerHTML =
        textPart +
        imgPart +
        vidPart +
        '<span class="chat-meta">@' + escapeHtml(item.from) + " &middot; " + escapeHtml(item.time) + "</span>";
      msgList.appendChild(bubble);
    }

    msgList.scrollTop = msgList.scrollHeight;
  }

  function subscribeChatRoom(key) {
    drawChatMessages(key);
    if (!db) return;

    if (activeChatListener && activeChatListener.ref) {
      activeChatListener.ref.off("value", activeChatListener.fn);
      activeChatListener = null;
    }

    var ref = db.ref("chats/" + key);
    var fn = function (snapshot) {
      var remoteList = [];
      snapshot.forEach(function (child) {
        var val = child.val();
        if (val && (val.text || val.image || val.video)) {
          remoteList.push(val);
        }
      });

      var localList = state.chats[key] || [];
      if (remoteList.length > 0) {
        state.chats[key] = remoteList;
        saveState();
      } else if (!localList.length) {
        state.chats[key] = [];
      }
      drawChatMessages(key);
    };

    ref.on("value", fn);
    activeChatListener = { ref: ref, fn: fn };
  }

  function renderChat() {
    var user = getCurrentUser();
    if (!user) return;

    var contactsBar = document.getElementById("chatContactsBar");
    var headerBtn = document.getElementById("btnOpenChatTargetProfile");

    contactsBar.innerHTML = "";
    var handles = [];
    for (var k in state.users) {
      if (Object.prototype.hasOwnProperty.call(state.users, k) && k !== user.handle) {
        handles.push(k);
      }
    }

    if (!handles.length) {
      handles.push(user.handle);
    }

    if (handles.indexOf(activeChatTarget) === -1) {
      activeChatTarget = handles[0];
    }

    for (var i = 0; i < handles.length; i++) {
      var h = handles[i];
      var pill = document.createElement("button");
      pill.type = "button";
      pill.className = "chat-contact-pill" + (h === activeChatTarget ? " active" : "");
      pill.textContent = "@" + h;
      pill.setAttribute("data-handle", h);
      pill.addEventListener("click", function () {
        activeChatTarget = this.getAttribute("data-handle");
        setFeedback(document.getElementById("chatFeedback"), "");
        renderChat();
      });
      contactsBar.appendChild(pill);
    }

    headerBtn.innerHTML = "<strong>@" + escapeHtml(activeChatTarget) + "</strong>";
    updateChatMutualState();
    subscribeChatRoom(getChatKey(user.handle, activeChatTarget));
  }

  document.getElementById("btnOpenChatTargetProfile").addEventListener("click", function () {
    openUserProfileModal(activeChatTarget, "followers");
  });

  var chatImageInput = document.getElementById("chatImageInput");
  var btnPickChatImage = document.getElementById("btnPickChatImage");
  var btnRemoveChatImage = document.getElementById("btnRemoveChatImage");

  var chatVideoInput = document.getElementById("chatVideoInput");
  var btnPickChatVideo = document.getElementById("btnPickChatVideo");
  var btnRemoveChatVideo = document.getElementById("btnRemoveChatVideo");

  if (btnPickChatImage && chatImageInput) {
    btnPickChatImage.addEventListener("click", function () {
      chatImageInput.click();
    });
  }

  if (chatImageInput) {
    chatImageInput.addEventListener("change", function () {
      readImageFile(this.files[0], function (dataUrl) {
        pendingChatImage = dataUrl;
        var prev = document.getElementById("chatImagePreview");
        var wrap = document.getElementById("chatImagePreviewWrap");
        if (prev) prev.src = dataUrl;
        if (wrap) {
          wrap.classList.remove("hidden");
          triggerPopupAnim(wrap);
        }
      });
    });
  }

  if (btnRemoveChatImage) {
    btnRemoveChatImage.addEventListener("click", function () {
      pendingChatImage = "";
      if (chatImageInput) chatImageInput.value = "";
      var prev = document.getElementById("chatImagePreview");
      var wrap = document.getElementById("chatImagePreviewWrap");
      if (prev) prev.src = "";
      if (wrap) wrap.classList.add("hidden");
    });
  }

  if (btnPickChatVideo && chatVideoInput) {
    btnPickChatVideo.addEventListener("click", function () {
      chatVideoInput.click();
    });
  }

  if (chatVideoInput) {
    chatVideoInput.addEventListener("change", function () {
      readVideoFile(this.files[0], function (videoSrc) {
        pendingChatVideo = videoSrc;
        var prev = document.getElementById("chatVideoPreview");
        var wrap = document.getElementById("chatVideoPreviewWrap");
        if (prev) prev.src = videoSrc;
        if (wrap) {
          wrap.classList.remove("hidden");
          triggerPopupAnim(wrap);
        }
      });
    });
  }

  if (btnRemoveChatVideo) {
    btnRemoveChatVideo.addEventListener("click", function () {
      pendingChatVideo = "";
      if (chatVideoInput) chatVideoInput.value = "";
      var prev = document.getElementById("chatVideoPreview");
      var wrap = document.getElementById("chatVideoPreviewWrap");
      if (prev) prev.src = "";
      if (wrap) wrap.classList.add("hidden");
    });
  }

  document.getElementById("btnSendChat").addEventListener("click", function () {
    var user = getCurrentUser();
    if (!user) return;
    var input = document.getElementById("chatMessageInput");
    var fb = document.getElementById("chatFeedback");
    var text = input.value.trim();

    if (!isMutualFollow(user.handle, activeChatTarget)) {
      if (fb) setFeedback(fb, "Vocês precisam se seguir mutuamente para enviar mensagens.");
      return;
    }

    if (!text && !pendingChatImage && !pendingChatVideo) return;

    var msgObj = {
      from: user.handle,
      text: text,
      image: pendingChatImage || "",
      video: pendingChatVideo || "",
      time: formatTime(Date.now())
    };

    var key = getChatKey(user.handle, activeChatTarget);
    if (!state.chats[key]) state.chats[key] = [];
    state.chats[key].push(msgObj);
    saveState();
    drawChatMessages(key);

    if (db) {
      var fbPayload = {
        from: msgObj.from,
        text: msgObj.text,
        time: msgObj.time
      };
      if (msgObj.image && msgObj.image.length < 850000) {
        fbPayload.image = msgObj.image;
      }
      if (msgObj.video && msgObj.video.indexOf("blob:") !== 0 && msgObj.video.length < 1800000) {
        fbPayload.video = msgObj.video;
      }

      db.ref("chats/" + key).push(fbPayload).catch(function (err) {
        if (fb) {
          setFeedback(fb, "Salvo local (erro no banco: " + (err && err.code ? err.code : "rede") + ")");
        }
      });
    }

    input.value = "";
    if (fb) setFeedback(fb, "");

    pendingChatImage = "";
    if (chatImageInput) chatImageInput.value = "";
    var chatImgPrev = document.getElementById("chatImagePreview");
    var chatImgWrap = document.getElementById("chatImagePreviewWrap");
    if (chatImgPrev) chatImgPrev.src = "";
    if (chatImgWrap) chatImgWrap.classList.add("hidden");

    pendingChatVideo = "";
    if (chatVideoInput) chatVideoInput.value = "";
    var chatVidPrev = document.getElementById("chatVideoPreview");
    var chatVidWrap = document.getElementById("chatVideoPreviewWrap");
    if (chatVidPrev) chatVidPrev.src = "";
    if (chatVidWrap) chatVidWrap.classList.add("hidden");
  });

  document.getElementById("btnClearChat").addEventListener("click", function () {
    var user = getCurrentUser();
    if (!user) return;
    var key = getChatKey(user.handle, activeChatTarget);
    state.chats[key] = [];
    saveState();
    if (db) {
      db.ref("chats/" + key).remove();
    }
    drawChatMessages(key);
  });

  function renderActivity() {
    var listEl = document.getElementById("activityList");
    listEl.innerHTML = "";
    if (!state.activities.length) {
      listEl.innerHTML = '<div class="empty-state">' + t("emptyAct") + "</div>";
      return;
    }
    for (var i = 0; i < state.activities.length; i++) {
      var act = state.activities[i];
      var row = document.createElement("div");
      row.className = "activity-item";
      row.innerHTML =
        "<span>" + escapeHtml(act.text) + "</span>" +
        '<span class="activity-time">' + escapeHtml(act.time) + "</span>";
      listEl.appendChild(row);
    }
  }

  document.getElementById("btnClearActivity").addEventListener("click", function () {
    state.activities = [];
    saveState();
    renderActivity();
  });

  document.getElementById("btnToggleEditProfile").addEventListener("click", function () {
    var user = getCurrentUser();
    if (!user) return;
    pendingAvatar = "";
    pendingBanner = "";
    document.getElementById("editNameInput").value = user.name;
    document.getElementById("editBioInput").value = user.bio;
    var box = document.getElementById("editProfileBox");
    box.classList.toggle("hidden");
    if (!box.classList.contains("hidden")) triggerPopupAnim(box);
  });

  document.getElementById("btnCancelEditProfile").addEventListener("click", function () {
    document.getElementById("editProfileBox").classList.add("hidden");
  });

  document.getElementById("editAvatarInput").addEventListener("change", function () {
    readImageFile(this.files[0], function (dataUrl) {
      pendingAvatar = dataUrl;
    });
  });

  document.getElementById("editBannerInput").addEventListener("change", function () {
    readImageFile(this.files[0], function (dataUrl) {
      pendingBanner = dataUrl;
    });
  });

  document.getElementById("btnSaveProfile").addEventListener("click", function () {
    var user = getCurrentUser();
    if (!user) return;
    var newName = document.getElementById("editNameInput").value.trim();
    var newBio = document.getElementById("editBioInput").value.trim();

    if (newName) user.name = newName;
    user.bio = newBio;
    if (pendingAvatar) user.avatar = pendingAvatar;
    if (pendingBanner) user.banner = pendingBanner;

    document.getElementById("editProfileBox").classList.add("hidden");
    saveState();
    syncUserToFirebase(user);
    renderAll();
  });

  function renderProfile() {
    var user = getCurrentUser();
    if (!user) return;

    document.getElementById("topUserHandle").textContent = "@" + user.handle;
    document.getElementById("profileDisplayName").textContent = user.name;
    document.getElementById("profileHandle").textContent = "@" + user.handle;
    document.getElementById("profileBio").textContent = user.bio || "";
    document.getElementById("profileAvatar").src = user.avatar || DEFAULT_AVATAR;

    var bannerEl = document.getElementById("profileBanner");
    bannerEl.style.backgroundImage = user.banner ? "url('" + user.banner + "')" : "";

    var myPosts = [];
    for (var i = 0; i < state.posts.length; i++) {
      if (state.posts[i].authorHandle === user.handle) {
        myPosts.push(state.posts[i]);
      }
    }

    document.getElementById("statPosts").textContent = String(myPosts.length);
    document.getElementById("statFollowers").textContent = String(countFollowers(user.handle));
    document.getElementById("statFollowing").textContent = String(getFollowingList(user.handle).length);

    renderPostList(document.getElementById("myPostsList"), myPosts, t("emptyFeed"));
  }

  document.getElementById("btnOpenMyFollowers").addEventListener("click", function () {
    var user = getCurrentUser();
    if (user) openUserProfileModal(user.handle, "followers");
  });

  document.getElementById("btnOpenMyFollowing").addEventListener("click", function () {
    var user = getCurrentUser();
    if (user) openUserProfileModal(user.handle, "following");
  });

  function renderRelationList(targetHandle, mode) {
    var listEl = document.getElementById("followRelationsList");
    var btnFollowers = document.getElementById("btnShowFollowersList");
    var btnFollowing = document.getElementById("btnShowFollowingList");

    viewedRelationTab = mode === "following" ? "following" : "followers";
    btnFollowers.classList.toggle("active", viewedRelationTab === "followers");
    btnFollowing.classList.toggle("active", viewedRelationTab === "following");

    var handles =
      viewedRelationTab === "following"
        ? getFollowingList(targetHandle)
        : getFollowersList(targetHandle);

    listEl.innerHTML = "";
    if (!handles.length) {
      listEl.innerHTML = '<div class="empty-state">' + t("emptyRelations") + "</div>";
      return;
    }

    for (var i = 0; i < handles.length; i++) {
      var h = handles[i];
      var u = state.users[h] || { handle: h, name: h };
      var row = document.createElement("div");
      row.className = "account-row";
      row.innerHTML =
        "<div><strong>" + escapeHtml(u.name) + '</strong> <span class="muted">@' + escapeHtml(h) + "</span></div>" +
        '<button class="btn btn-secondary btn-sm js-rel-open" data-handle="' + escapeHtml(h) + '" type="button">@</button>';
      listEl.appendChild(row);
    }

    var openBtns = listEl.querySelectorAll(".js-rel-open");
    for (var j = 0; j < openBtns.length; j++) {
      openBtns[j].addEventListener("click", function () {
        openUserProfileModal(this.getAttribute("data-handle"), "followers");
      });
    }
  }

  function renderUserProfileModal(handle) {
    var clean = normalizeHandle(handle);
    var currentUser = getCurrentUser();
    var target = state.users[clean] || {
      handle: clean || "efex",
      name: clean || "efex",
      bio: "",
      avatar: DEFAULT_AVATAR,
      banner: "",
      following: []
    };

    viewedProfileHandle = target.handle;
    document.getElementById("viewProfileTitle").textContent = "@" + target.handle;
    document.getElementById("viewProfileName").textContent = target.name;
    document.getElementById("viewProfileHandle").textContent = "@" + target.handle;
    document.getElementById("viewProfileBio").textContent = target.bio || "";
    document.getElementById("viewProfileAvatar").src = target.avatar || DEFAULT_AVATAR;
    document.getElementById("viewProfileBanner").style.backgroundImage = target.banner
      ? "url('" + target.banner + "')"
      : "";

    var userPosts = [];
    for (var i = 0; i < state.posts.length; i++) {
      if (state.posts[i].authorHandle === target.handle) {
        userPosts.push(state.posts[i]);
      }
    }

    document.getElementById("viewStatPosts").textContent = String(userPosts.length);
    document.getElementById("viewStatFollowers").textContent = String(countFollowers(target.handle));
    document.getElementById("viewStatFollowing").textContent = String(getFollowingList(target.handle).length);

    var followBtn = document.getElementById("btnViewProfileFollow");
    var msgBtn = document.getElementById("btnViewProfileMessage");

    if (!currentUser || currentUser.handle === target.handle) {
      followBtn.classList.add("hidden");
      msgBtn.classList.add("hidden");
    } else {
      followBtn.classList.remove("hidden");
      msgBtn.classList.remove("hidden");
      var isFollowing = currentUser.following && currentUser.following.indexOf(target.handle) !== -1;
      followBtn.textContent = isFollowing ? t("followingBtn") : t("follow");
      followBtn.className = "btn " + (isFollowing ? "btn-secondary" : "btn-primary") + " btn-sm";
      msgBtn.textContent = t("messageBtn");
    }

    renderRelationList(target.handle, viewedRelationTab);
    renderPostList(document.getElementById("viewUserPostsList"), userPosts, t("emptyFeed"));
  }

  function openUserProfileModal(handle, relationTab) {
    viewedRelationTab = relationTab || "followers";
    renderUserProfileModal(handle);
    openModal("userProfileModal");
  }

  document.getElementById("btnCloseUserProfile").addEventListener("click", function () {
    closeModal("userProfileModal");
  });

  document.getElementById("btnViewProfileFollow").addEventListener("click", function () {
    toggleFollow(viewedProfileHandle);
  });

  document.getElementById("btnViewProfileMessage").addEventListener("click", function () {
    activeChatTarget = viewedProfileHandle;
    closeModal("userProfileModal");
    switchTab("chat");
  });

  document.getElementById("btnShowFollowersList").addEventListener("click", function () {
    renderRelationList(viewedProfileHandle, "followers");
  });

  document.getElementById("btnShowFollowingList").addEventListener("click", function () {
    renderRelationList(viewedProfileHandle, "following");
  });

  document.getElementById("btnViewTabFollowers").addEventListener("click", function () {
    renderRelationList(viewedProfileHandle, "followers");
  });

  document.getElementById("btnViewTabFollowing").addEventListener("click", function () {
    renderRelationList(viewedProfileHandle, "following");
  });

  function openAuthModal() {
    setFeedback(document.getElementById("authFeedback"), "");
    renderSavedAccounts();
    openModal("authModal");
  }

  function closeAuthModal() {
    closeModal("authModal");
  }

  document.getElementById("btnOpenAuth").addEventListener("click", openAuthModal);
  document.getElementById("btnSwitchAccount").addEventListener("click", openAuthModal);
  document.getElementById("btnCloseAuth").addEventListener("click", closeAuthModal);

  document.getElementById("btnLogout").addEventListener("click", function () {
    state.currentHandle = "";
    resetViewActive = false;
    saveState();
    syncAuthGate();
  });

  document.getElementById("btnOpenSettings").addEventListener("click", function () {
    document.getElementById("curPassInput").value = "";
    document.getElementById("newPassInput").value = "";
    setFeedback(document.getElementById("settingsFeedback"), "");
    applyThemeAndLang();
    openModal("settingsModal");
  });

  document.getElementById("btnCloseSettings").addEventListener("click", function () {
    closeModal("settingsModal");
  });

  document.getElementById("btnChangePass").addEventListener("click", function () {
    var user = getCurrentUser();
    var fb = document.getElementById("settingsFeedback");
    if (!user) return;

    var curPass = document.getElementById("curPassInput").value;
    var newPass = document.getElementById("newPassInput").value;

    if (!curPass || !newPass) {
      setFeedback(fb, t("needHandlePass"));
      return;
    }

    fetchPublicIp(function (currentIp) {
      hashPassword(curPass, function (curDigest) {
        if (user.passHash !== curDigest) {
          setFeedback(fb, t("wrongPass"));
          return;
        }
        hashPassword(newPass, function (newDigest) {
          user.passHash = newDigest;
          if (currentIp) user.ownerIp = currentIp;
          user.ownerToken = getDeviceToken();
          markHandleAsOwned(user.handle);
          document.getElementById("curPassInput").value = "";
          document.getElementById("newPassInput").value = "";
          addActivity("@" + user.handle + " alterou a senha.");
          saveState();
          syncUserToFirebase(user);
          setFeedback(fb, t("passUpdated"));
        });
      });
    });
  });

  var themeOpts = document.querySelectorAll(".js-theme-opt");
  for (var tIdx = 0; tIdx < themeOpts.length; tIdx++) {
    themeOpts[tIdx].addEventListener("click", function () {
      state.theme = this.getAttribute("data-theme");
      saveState();
      applyThemeAndLang();
    });
  }

  var langOpts = document.querySelectorAll(".js-lang-opt");
  for (var lIdx = 0; lIdx < langOpts.length; lIdx++) {
    langOpts[lIdx].addEventListener("click", function () {
      state.lang = this.getAttribute("data-lang");
      saveState();
      applyThemeAndLang();
      renderAll();
    });
  }

  document.getElementById("btnResetApp").addEventListener("click", function () {
    state = createInitialState();
    resetViewActive = false;
    saveState();
    applyThemeAndLang();
    closeModal("settingsModal");
    syncAuthGate();
  });

  function getTopicLabel(topic) {
    if (topic === "chat") return t("topicChat");
    if (topic === "bug") return t("topicBug");
    return t("topicAccount");
  }

  function buildSupportPayload(email, msg) {
    var user = getCurrentUser();
    var handle = user ? "@" + user.handle : "@guest";
    return [
      "Para: " + SUPPORT_EMAIL,
      "Assunto: efex - " + getTopicLabel(supportTopic),
      "Usuario: " + handle,
      "E-mail: " + (email || "-"),
      "Status: " + state.theme + " | " + state.lang + " | Posts: " + state.posts.length,
      "Mensagem: " + msg
    ].join("\n");
  }

  function renderSupportTickets() {
    var listEl = document.getElementById("supportTicketsList");
    listEl.innerHTML = "";
    if (!state.tickets.length) {
      listEl.innerHTML = '<div class="empty-state">' + t("emptyTickets") + "</div>";
      return;
    }
    for (var i = 0; i < state.tickets.length; i++) {
      var tk = state.tickets[i];
      var row = document.createElement("div");
      row.className = "activity-item";
      row.innerHTML =
        "<span><strong>[" + escapeHtml(tk.topicLabel) + "]</strong> " + escapeHtml(tk.message) + "</span>" +
        '<span class="activity-time">' + escapeHtml(tk.time) + "</span>";
      listEl.appendChild(row);
    }
  }

  var supTopicBtns = document.querySelectorAll(".js-sup-topic");
  for (var sIdx = 0; sIdx < supTopicBtns.length; sIdx++) {
    supTopicBtns[sIdx].addEventListener("click", function () {
      supportTopic = this.getAttribute("data-topic");
      applyThemeAndLang();
    });
  }

  document.getElementById("btnOpenSupport").addEventListener("click", function () {
    setFeedback(document.getElementById("supportFeedback"), "");
    applyThemeAndLang();
    renderSupportTickets();
    openModal("supportModal");
  });

  document.getElementById("btnCloseSupport").addEventListener("click", function () {
    closeModal("supportModal");
  });

  document.getElementById("btnSaveTicketLocal").addEventListener("click", function () {
    var email = document.getElementById("supportEmailInput").value.trim();
    var msg = document.getElementById("supportMsgInput").value.trim();
    var fb = document.getElementById("supportFeedback");

    if (!msg) {
      setFeedback(fb, t("needSupportMsg"));
      return;
    }

    var label = getTopicLabel(supportTopic);
    state.tickets.unshift({
      topicLabel: label,
      email: email,
      message: msg,
      time: formatTime(Date.now())
    });
    if (state.tickets.length > 20) {
      state.tickets = state.tickets.slice(0, 20);
    }

    copyToClipboard(buildSupportPayload(email, msg));
    addActivity("Chamado [" + label + "] registrado.");
    saveState();

    document.getElementById("supportMsgInput").value = "";
    renderSupportTickets();
    renderActivity();
    setFeedback(fb, t("ticketSaved"));
  });

  document.getElementById("btnSendMailSupport").addEventListener("click", function () {
    var email = document.getElementById("supportEmailInput").value.trim();
    var msg = document.getElementById("supportMsgInput").value.trim();
    var fb = document.getElementById("supportFeedback");

    if (!msg) {
      setFeedback(fb, t("needSupportMsg"));
      return;
    }

    var payload = buildSupportPayload(email, msg);
    copyToClipboard(payload);

    var subject = encodeURIComponent("efex - " + getTopicLabel(supportTopic));
    var body = encodeURIComponent(payload.replace(/\n/g, " - "));
    var gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      "&to=efexsupport@gmail.com" +
      "&su=" + subject +
      "&body=" + body;

    setFeedback(fb, t("mailOpened"));
    window.location.assign(gmailUrl);
  });

  document.getElementById("btnCopyDiag").addEventListener("click", function () {
    var info =
      "efex v1 | Theme: " +
      state.theme +
      " | Lang: " +
      state.lang +
      " | Users: " +
      Object.keys(state.users).length +
      " | Posts: " +
      state.posts.length;

    copyToClipboard(info);
    setFeedback(document.getElementById("supportFeedback"), t("copied"));
  });

  function renderSavedAccounts() {
    var listEl = document.getElementById("savedAccountsList");
    var cur = getCurrentUser();
    listEl.innerHTML = "";
    if (!cur) return;

    var row = document.createElement("div");
    row.className = "account-row";
    row.innerHTML =
      "<div><strong>" + escapeHtml(cur.name) + '</strong> <span class="muted">@' + escapeHtml(cur.handle) + "</span></div>" +
      '<span class="handle-pill">Ativa</span>';
    listEl.appendChild(row);
  }

  document.getElementById("btnAuthSubmit").addEventListener("click", function () {
    var handle = normalizeHandle(document.getElementById("authHandleInput").value);
    var name = document.getElementById("authNameInput").value.trim();
    var pass = document.getElementById("authPassInput").value;
    var feedback = document.getElementById("authFeedback");

    if (!handle || !pass) {
      setFeedback(feedback, t("needHandlePass"));
      return;
    }

    fetchPublicIp(function (currentIp) {
      hashPassword(pass, function (digest) {
        if (state.users[handle]) {
          if (state.users[handle].passHash !== digest) {
            setFeedback(feedback, t("wrongPass"));
            return;
          }
          if (!state.users[handle].ownerIp && currentIp) {
            state.users[handle].ownerIp = currentIp;
            syncUserToFirebase(state.users[handle]);
          }
          state.currentHandle = handle;
        } else {
          var created = {
            handle: handle,
            name: name || handle,
            passHash: digest,
            ownerToken: getDeviceToken(),
            ownerIp: currentIp || "",
            bio: "",
            avatar: DEFAULT_AVATAR,
            banner: "",
            following: []
          };
          state.users[handle] = created;
          state.currentHandle = handle;
          markHandleAsOwned(handle);
          syncUserToFirebase(created);
        }

        document.getElementById("authHandleInput").value = "";
        document.getElementById("authNameInput").value = "";
        document.getElementById("authPassInput").value = "";

        saveState();
        closeAuthModal();
        syncAuthGate();
        renderAll();
      });
    });
  });

  function renderAll() {
    applyThemeAndLang();
    renderProfile();
    renderFeed();
    renderPostsTab();
    renderChat();
    renderActivity();
  }

  applyThemeAndLang();
  subscribeRemoteData();
  syncAuthGate();
})();
