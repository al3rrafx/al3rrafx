const WHATSAPP_NUMBER = "201090992597";
const TIKTOK_URL = "https://www.tiktok.com/@al3rrafx";

async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            showToast('✅ تم نسخ النتيجة بنجاح!');
            return true;
        } catch (err) {}
    }
    
    try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (success) {
            showToast('✅ تم نسخ النتيجة بنجاح!');
            return true;
        }
    } catch (err) {}
    
    showManualCopyDialog(text);
    return false;
}

function showManualCopyDialog(text) {
    const modal = document.createElement('div');
    modal.className = 'manual-copy-modal';
    modal.innerHTML = `
        <div class="manual-copy-box">
            <h3>📋 نسخ النتيجة</h3>
            <div class="manual-copy-text">${text.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</div>
            <button class="manual-copy-btn" id="manualCopyBtn">📋 حدد النص وانسخه</button>
            <button class="manual-copy-close" id="manualCopyClose">إغلاق</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    const textDiv = modal.querySelector('.manual-copy-text');
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(textDiv);
    selection.removeAllRanges();
    selection.addRange(range);
    
    modal.querySelector('#manualCopyClose').onclick = () => modal.remove();
}

function createShareButtons(resultText) {
    const shareDiv = document.createElement('div');
    shareDiv.className = 'share-buttons';
    
    const buttons = [
        { class: 'btn-copy', text: '📋 نسخ النص', action: () => copyToClipboard(resultText) },
        { class: 'btn-whatsapp', text: '💬 واتساب', action: () => window.open(`https://wa.me/?text=${encodeURIComponent(resultText)}`, '_blank') },
        { class: 'btn-facebook', text: '📘 فيسبوك', action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(resultText.substring(0, 500))}`, '_blank') },
        { class: 'btn-instagram', text: '📸 انستقرام', action: () => { copyToClipboard(resultText); showToast('📸 تم نسخ النص، يمكنك لصقه في انستقرام'); setTimeout(() => window.open('https://www.instagram.com', '_blank'), 500); } },
        { class: 'btn-more', text: '📤 منصات أخرى', action: () => navigator.share ? navigator.share({ title: 'العرَّاف', text: resultText }) : copyToClipboard(resultText) }
    ];
    
    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.className = `share-btn ${btn.class}`;
        button.innerHTML = btn.text;
        button.onclick = btn.action;
        shareDiv.appendChild(button);
    });
    
    return shareDiv;
}

document.addEventListener('DOMContentLoaded', () => {
    const revealBtn = document.getElementById('revealBtn');
    if (revealBtn) {
        revealBtn.addEventListener('click', () => {
            const userName = document.getElementById('userName').value;
            const day = document.getElementById('birthDay').value;
            const month = document.getElementById('birthMonth').value;
            const resetLoading = showLoading(revealBtn);
            
            setTimeout(() => {
                const report = generateFullReport(userName, day, month);
                const resultDiv = document.getElementById('fullReading');
                resultDiv.style.display = 'block';
                resultDiv.innerHTML = report.replace(/\n/g, '<br>');
                resultDiv.appendChild(createShareButtons(report));
                resetLoading();
                resultDiv.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        });
    }
    
    const coupleBtn = document.getElementById('coupleBtn');
    if (coupleBtn) {
        coupleBtn.addEventListener('click', () => {
            const day1 = document.getElementById('coupleDay1').value;
            const month1 = document.getElementById('coupleMonth1').value;
            const day2 = document.getElementById('coupleDay2').value;
            const month2 = document.getElementById('coupleMonth2').value;
            const name1 = document.getElementById('coupleName1').value;
            const name2 = document.getElementById('coupleName2').value;
            
            if (!day1 || !month1) {
                document.getElementById('coupleResult').style.display = 'block';
                document.getElementById('coupleResult').innerHTML = "⚠️ من فضلك اختر تاريخ ميلاد الشخص الأول";
                return;
            }
            if (!day2 || !month2) {
                document.getElementById('coupleResult').style.display = 'block';
                document.getElementById('coupleResult').innerHTML = "⚠️ من فضلك اختر تاريخ ميلاد الشخص الثاني";
                return;
            }
            
            const resetLoading = showLoading(coupleBtn);
            
            setTimeout(() => {
                const zodiac1 = getZodiac(parseInt(day1), parseInt(month1));
                const zodiac2 = getZodiac(parseInt(day2), parseInt(month2));
                
                if (!zodiac1 || !zodiac2) {
                    document.getElementById('coupleResult').style.display = 'block';
                    document.getElementById('coupleResult').innerHTML = "⚠️ لم نتعرف على الأبراج";
                    resetLoading();
                    return;
                }
                
                const report = getDetailedCompatibility(zodiac1, zodiac2, name1, name2);
                const resultDiv = document.getElementById('coupleResult');
                resultDiv.style.display = 'block';
                resultDiv.innerHTML = report.replace(/\n/g, '<br>');
                resultDiv.appendChild(createShareButtons(report));
                resetLoading();
                resultDiv.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        });
    }
    
    const askBtn = document.getElementById('askWhatsappBtn');
    if (askBtn) {
        askBtn.addEventListener('click', () => {
            const question = prompt("✍️ اكتب سؤالك للعراف:");
            if (question && question.trim() !== "") {
                window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('مرحباً أيها العراف ' + question.trim())}`;
            }
        });
    }
});

function getDetailedCompatibility(zodiac1, zodiac2, name1, name2) {
    const z1 = zodiacData[zodiac1];
    const z2 = zodiacData[zodiac2];
    if (!z1 || !z2) return "⚠️ لم نتعرف على الأبراج بشكل صحيح";
    
    const element1 = z1.element;
    const element2 = z2.element;
    const sameZodiac = (zodiac1 === zodiac2);
    
    let emotional = 50, mental = 50, social = 50, financial = 50, family = 50, sexual = 50;
    let emotionalText = "", mentalText = "", socialText = "", financialText = "", familyText = "", sexualText = "";
    
    if (sameZodiac) {
        emotional = 95; emotionalText = "💖 توافق عاطفي ممتاز! أنتما نفس البرج.";
        mental = 98; mentalText = "🧠 توافق فكري خارق!";
        social = 90; socialText = "🎉 توافق اجتماعي ممتاز!";
        financial = 85; financialText = "💰 توافق مالي جيد!";
        family = 92; familyText = "🏡 توافق أسري ممتاز!";
        sexual = 93; sexualText = "🔥🔥 توافق جنسي ممتاز!";
    } else if ((element1 === "ماء" && element2 === "ماء") || (element1 === "نار" && element2 === "نار")) {
        emotional = 90; emotionalText = "🔥 توافق عاطفي ناري!";
        mental = 75; mentalText = "💭 توافق فكري جيد.";
        social = 90; socialText = "🎉 علاقة اجتماعية رائعة!";
        financial = 55; financialText = "⚠️ توافق مالي يحتاج تفاهم.";
        family = 60; familyText = "🏠 توافق أسري متوسط.";
        sexual = 95; sexualText = "🔥🔥 توافق جنسي ناري!";
    } else if ((element1 === "ماء" && element2 === "تراب") || (element1 === "تراب" && element2 === "ماء")) {
        emotional = 85; emotionalText = "💧 توافق عاطفي ممتاز!";
        mental = 80; mentalText = "📚 توافق فكري جيد.";
        social = 60; socialText = "🕯️ علاقة اجتماعية هادئة.";
        financial = 85; financialText = "💎 توافق مالي جيد.";
        family = 90; familyText = "🏡 توافق أسري ممتاز!";
        sexual = 85; sexualText = "✨ جاذبية قوية!";
    } else if ((element1 === "نار" && element2 === "هواء") || (element1 === "هواء" && element2 === "نار")) {
        emotional = 80; emotionalText = "💨 النار والهواء معًا!";
        mental = 85; mentalText = "✨ توافق فكري ممتاز.";
        social = 85; socialText = "🌟 توافق اجتماعي ممتاز.";
        financial = 55; financialText = "⚠️ توافق مالي يحتاج تفاهم.";
        family = 60; familyText = "🏠 توافق أسري متوسط.";
        sexual = 85; sexualText = "✨ جاذبية قوية!";
    } else if ((element1 === "تراب" && element2 === "تراب")) {
        emotional = 75; emotionalText = "🌍 توافق ترابي جيد.";
        mental = 80; mentalText = "📚 توافق فكري جيد.";
        social = 60; socialText = "🕯️ علاقة اجتماعية هادئة.";
        financial = 95; financialText = "💰 توافق مالي ممتاز!";
        family = 85; familyText = "👨‍👩‍👧‍👦 توافق أسري جيد.";
        sexual = 65; sexualText = "🌍 توافق جنسي هادئ.";
    } else if ((element1 === "هواء" && element2 === "هواء")) {
        emotional = 70; emotionalText = "💨 علاقة عقلانية.";
        mental = 95; mentalText = "🧠 توافق فكري خارق!";
        social = 90; socialText = "🎉 علاقة اجتماعية رائعة!";
        financial = 55; financialText = "⚠️ توافق مالي يحتاج تفاهم.";
        family = 60; familyText = "🏠 توافق أسري متوسط.";
        sexual = 65; sexualText = "🌍 توافق جنسي هادئ.";
    } else {
        emotional = 55; emotionalText = "⚠️ توافق عاطفي متوسط.";
        mental = 50; mentalText = "⚠️ توافق فكري متوسط.";
        social = 60; socialText = "🕯️ علاقة اجتماعية هادئة.";
        financial = 55; financialText = "⚠️ توافق مالي يحتاج تفاهم.";
        family = 60; familyText = "🏠 توافق أسري متوسط.";
        sexual = 65; sexualText = "🌍 توافق جنسي هادئ.";
    }
    
    const conflictText = "⚠️ نقاط الخلاف موجودة، لكن الحوار المفتوح هو الحل السحري.";
    const totalAvg = (emotional + mental + social + financial + family + sexual) / 6;
    
    let adviceText = "";
    if (sameZodiac) {
        adviceText = "💖 أنتما نفس البرج! تفاهم طبيعي واستثنائي ✨";
    } else if (totalAvg >= 85) {
        adviceText = "💖 أنتما ثنائي استثنائي! السماء تبارك اتحادكم ✨";
    } else if (totalAvg >= 70) {
        adviceText = "💑 علاقة جيدة ومستقرة. النجاح قريب 💪";
    } else if (totalAvg >= 55) {
        adviceText = "🌹 العلاقة محتاجة مجهود. الصبر مفتاح النجاح 🗝️";
    } else {
        adviceText = "⚠️ العلاقة تحتاج عمل كبير. لكن الحب الحقيقي قادر على تخطي الصعاب 🌱";
    }
    
    const nameLine1 = name1 ? `${name1} (${zodiac1} ${z1.symbol})` : `${zodiac1} ${z1.symbol}`;
    const nameLine2 = name2 ? `${name2} (${zodiac2} ${z2.symbol})` : `${zodiac2} ${z2.symbol}`;
    const sameZodiacNote = sameZodiac ? "\n✨ ملاحظة: أنتما نفس البرج، وهذا يمنحكما تفاهمًا طبيعيًا واستثنائيًا ✨" : "";
    
    return `✨✨ توافق ${nameLine1} مع ${nameLine2} ✨✨${sameZodiacNote}

━━━━━━━━━━━━━━━━━━━━
📊 نسب التوافق الشامل:
━━━━━━━━━━━━━━━━━━━━

💕 التوافق العاطفي: ${emotional}%
   ${emotionalText}

🧠 التوافق الفكري: ${mental}%
   ${mentalText}

👥 التوافق الاجتماعي: ${social}%
   ${socialText}

💰 التوافق المادي: ${financial}%
   ${financialText}

🏠 التوافق الأسري: ${family}%
   ${familyText}

🔥 التوافق الجنسي: ${sexual}%
   ${sexualText}

━━━━━━━━━━━━━━━━━━━━
⚠️ نقاط الخلاف المحتملة:
━━━━━━━━━━━━━━━━━━━━
${conflictText}

━━━━━━━━━━━━━━━━━━━━
📝 نصيحة العراف النهائية:
━━━━━━━━━━━━━━━━━━━━
${adviceText}

🌙 عناصركما: ${element1} + ${element2}
🔮 العرَّاف يتمنى لكما السعادة والتفاهم ✨

━━━━━━━━━━━━━━━━━━━━
📱 تم المشاركة من تطبيق العرَّاف
📱 ${TIKTOK_URL}`;
}