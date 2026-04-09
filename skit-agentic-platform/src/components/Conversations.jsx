import { useState, useEffect, useRef, useCallback } from 'react';

// ── Mock Data ───────────────────────────────────────────────────────────────

const conversations = [
  {
    id: 'c1',
    accountId: '#APX-4821',
    outcome: 'Settled',
    amount: '$3,400',
    qualityScore: null,
    channels: ['SMS', 'SMS', 'Bot'],
    direction: 'Outbound',
    sentiment: 'Positive',
    language: 'English',
    daysAgo: 1,
    summary: 'Received settlement SMS Day 17. Clicked link. Called payment bot next day. Settled at 15% discount.',
    transcript: [
      { actor: 'System', text: 'SMS campaign triggered - Settlement offer', ts: '10:15 AM' },
      { actor: 'Bot', text: 'Hi, this is a message from Apex Recovery Partners regarding your account. A settlement offer of $2,890 (15% discount) is available. Tap here to review terms and pay securely.', ts: '10:15 AM' },
      { actor: 'System', text: 'Consumer opened SMS and clicked payment link', ts: '2:30 PM' },
      { actor: 'Consumer', text: 'I want to settle this. What are the payment options?', ts: '9:45 AM +1d' },
      { actor: 'Bot', text: 'Great. You can pay in full today for $2,890 or set up a 3-month plan at $970/month. Which works best for you?', ts: '9:45 AM +1d' },
      { actor: 'Consumer', text: 'Full payment. Let me enter my card.', ts: '9:47 AM +1d' },
      { actor: 'System', text: 'Payment of $2,890 processed successfully', ts: '9:52 AM +1d' },
    ],
    timeline: [
      { day: 'Day 15', event: 'Account placed in SMS settlement campaign', channel: 'SMS', color: '#185FA5' },
      { day: 'Day 17', event: 'Settlement SMS delivered and opened', channel: 'SMS', color: '#185FA5' },
      { day: 'Day 17', event: 'Consumer clicked payment link', channel: 'SMS', color: '#185FA5' },
      { day: 'Day 18', event: 'Consumer called payment bot', channel: 'Bot', color: '#5F5E5A' },
      { day: 'Day 18', event: 'Payment of $2,890 processed. Account settled.', channel: 'Bot', color: '#3B6D11' },
    ],
    signals: [],
  },
  {
    id: 'c2',
    accountId: '#APX-3107',
    outcome: 'Settled',
    amount: '$5,100',
    qualityScore: 91,
    channels: ['Voice AI', 'SMS', 'Voice AI', 'Human'],
    direction: 'Outbound',
    sentiment: 'Neutral',
    language: 'English',
    daysAgo: 2,
    summary: 'Initial voice AI no answer. SMS sent. Second voice AI connected, consumer asked questions. Transferred to human agent. Settled at 15%.',
    transcript: [
      { actor: 'System', text: 'Voice AI call attempt 1 - No answer', ts: '9:30 AM' },
      { actor: 'System', text: 'SMS fallback triggered', ts: '10:00 AM' },
      { actor: 'Bot', text: 'Hi, this is Apex Recovery Partners. We have an important message about your account. Please call us back at your convenience.', ts: '10:00 AM' },
      { actor: 'System', text: 'Voice AI call attempt 2 - Connected', ts: '2:15 PM +2d' },
      { actor: 'Voice AI', text: 'Hello, this is a call from Apex Recovery Partners. This is an attempt to collect a debt and any information obtained will be used for that purpose. This call may be recorded for quality assurance. Am I speaking with the account holder?', ts: '2:15 PM +2d' },
      { actor: 'Consumer', text: 'Yes. What is this about? I got a text from you.', ts: '2:15 PM +2d' },
      { actor: 'Voice AI', text: 'Thank you for confirming. I am calling about your outstanding balance of $5,100 on your account. We have a settlement offer available. We can offer a 15% discount if settled today, bringing your total to $4,335. Would you like to hear more details?', ts: '2:16 PM +2d' },
      { actor: 'Consumer', text: 'I need to talk to a real person about this.', ts: '2:16 PM +2d' },
      { actor: 'System', text: 'Channel switch: Voice AI transferred to Human Agent', ts: '2:17 PM +2d', isChannelSwitch: true },
      { actor: 'Human', text: 'Hi, my name is Sarah. I am taking over from our automated system. This is an attempt to collect a debt and any information obtained will be used for that purpose. I can walk you through the settlement options. The 15% discount brings your balance to $4,335. We can also set up a 3-month payment plan at $1,445 per month.', ts: '2:18 PM +2d' },
      { actor: 'Consumer', text: 'The payment plan works. Set it up.', ts: '2:20 PM +2d' },
      { actor: 'System', text: 'Payment plan created. First payment of $1,445 scheduled.', ts: '2:22 PM +2d' },
    ],
    timeline: [
      { day: 'Day 10', event: 'Voice AI call - no answer', channel: 'Voice AI', color: '#3B6D11' },
      { day: 'Day 10', event: 'SMS fallback delivered', channel: 'SMS', color: '#185FA5' },
      { day: 'Day 12', event: 'Voice AI call - connected, transferred to human', channel: 'Voice AI', color: '#3B6D11' },
      { day: 'Day 12', event: 'Human agent closed settlement', channel: 'Human', color: '#854F0B' },
      { day: 'Day 12', event: 'Payment plan created. $4,335 over 3 months.', channel: 'Human', color: '#3B6D11' },
    ],
    signals: ['Right party contact confirmed', 'Settlement accepted', 'Escalation to human'],
  },
  {
    id: 'c3',
    accountId: '#APX-2894',
    outcome: 'PTP',
    amount: null,
    qualityScore: 88,
    channels: ['SMS', 'Voice AI'],
    direction: 'Outbound',
    sentiment: 'Neutral',
    language: 'English',
    daysAgo: 2,
    summary: 'SMS opened. Voice AI follow-up connected. Consumer promised to pay Friday. PTP tracked.',
    transcript: [
      { actor: 'System', text: 'SMS delivered and opened by consumer', ts: '8:30 AM' },
      { actor: 'Bot', text: 'Apex Recovery Partners: Your account has an outstanding balance. Please call us or reply to discuss options.', ts: '8:30 AM' },
      { actor: 'System', text: 'Voice AI follow-up call - Connected', ts: '11:00 AM +1d' },
      { actor: 'System', text: 'Channel switch: SMS campaign followed by Voice AI outbound', ts: '11:00 AM +1d', isChannelSwitch: true },
      { actor: 'Voice AI', text: 'Hello, this is Apex Recovery Partners. This is an attempt to collect a debt and any information obtained will be used for that purpose. This call may be recorded. Am I speaking with the account holder?', ts: '11:00 AM +1d' },
      { actor: 'Consumer', text: 'Yes, I got your text. I know I owe this but I cannot pay right now.', ts: '11:01 AM +1d' },
      { actor: 'Voice AI', text: 'I understand that can be difficult. Would you be able to make a payment this week? We have flexible options and can work with you on the timing.', ts: '11:01 AM +1d' },
      { actor: 'Consumer', text: 'I get paid Friday. I can pay then.', ts: '11:02 AM +1d' },
      { actor: 'Voice AI', text: 'Thank you. I have noted a promise to pay for this Friday. We will send you a reminder. Is there anything else?', ts: '11:02 AM +1d' },
      { actor: 'System', text: 'PTP recorded for Friday', ts: '11:03 AM +1d' },
    ],
    timeline: [
      { day: 'Day 14', event: 'SMS campaign message delivered', channel: 'SMS', color: '#185FA5' },
      { day: 'Day 14', event: 'Consumer opened SMS', channel: 'SMS', color: '#185FA5' },
      { day: 'Day 15', event: 'Voice AI follow-up connected', channel: 'Voice AI', color: '#3B6D11' },
      { day: 'Day 15', event: 'Consumer promised to pay Friday', channel: 'Voice AI', color: '#185FA5' },
      { day: 'Day 15', event: 'PTP recorded and reminder scheduled', channel: 'SMS', color: '#185FA5' },
    ],
    signals: ['Right party contact confirmed', 'Promise to pay captured'],
  },
  {
    id: 'c4',
    accountId: '#APX-5523',
    outcome: 'Settled',
    amount: '$4,200',
    qualityScore: 93,
    channels: ['Voice AI'],
    direction: 'Outbound',
    sentiment: 'Positive',
    language: 'English',
    daysAgo: 3,
    summary: 'Voice AI connected first attempt. Consumer agreed to settlement on call. Processed via payment bot.',
    transcript: [
      { actor: 'System', text: 'Voice AI call attempt 1 - Connected', ts: '10:30 AM' },
      { actor: 'Voice AI', text: 'This is Apex Recovery Partners. This is an attempt to collect a debt and any information obtained will be used for that purpose. Am I speaking with the account holder?', ts: '10:30 AM' },
      { actor: 'Consumer', text: 'Yes, that is me. What do you want?', ts: '10:30 AM' },
      { actor: 'Voice AI', text: 'Your account has a balance of $4,200. We have a settlement offer available -- you can resolve this for $3,570, which is a 15% discount. Would you like to proceed?', ts: '10:31 AM' },
      { actor: 'Consumer', text: 'Yes, I want to get this done. How do I pay?', ts: '10:31 AM' },
      { actor: 'Voice AI', text: 'I can transfer you to our secure payment system right now. One moment please.', ts: '10:32 AM' },
      { actor: 'System', text: 'Transferred to payment bot', ts: '10:32 AM' },
      { actor: 'System', text: 'Payment of $3,570 processed successfully', ts: '10:38 AM' },
    ],
    timeline: [
      { day: 'Day 11', event: 'Account queued for Voice AI campaign', channel: 'Voice AI', color: '#3B6D11' },
      { day: 'Day 11', event: 'Voice AI connected, consumer agreed to settle', channel: 'Voice AI', color: '#3B6D11' },
      { day: 'Day 11', event: 'Transferred to payment bot', channel: 'Bot', color: '#5F5E5A' },
      { day: 'Day 11', event: 'Payment of $3,570 processed', channel: 'Bot', color: '#3B6D11' },
    ],
    signals: ['Right party contact confirmed', 'Settlement accepted', 'First-call resolution'],
  },
  {
    id: 'c5',
    accountId: '#APX-1876',
    outcome: 'No answer',
    amount: null,
    qualityScore: null,
    channels: ['SMS', 'SMS'],
    direction: 'Outbound',
    sentiment: 'Unknown',
    language: 'English',
    daysAgo: 3,
    summary: 'Two SMS sent. No opens. No engagement. Account remains in digital queue.',
    transcript: [
      { actor: 'System', text: 'SMS campaign message 1 delivered', ts: '9:00 AM' },
      { actor: 'Bot', text: 'Apex Recovery Partners: Important information about your account. Please call us at your earliest convenience.', ts: '9:00 AM' },
      { actor: 'System', text: 'No open detected after 48 hours', ts: '9:00 AM +2d' },
      { actor: 'System', text: 'SMS campaign message 2 delivered', ts: '9:15 AM +3d' },
      { actor: 'Bot', text: 'Apex Recovery Partners: A resolution offer is available on your account. Reply CALL to schedule a callback or tap here to view details.', ts: '9:15 AM +3d' },
      { actor: 'System', text: 'No open detected. Account flagged for voice AI attempt.', ts: '9:15 AM +5d' },
    ],
    timeline: [
      { day: 'Day 12', event: 'First SMS delivered', channel: 'SMS', color: '#185FA5' },
      { day: 'Day 14', event: 'No open detected', channel: 'SMS', color: '#5F5E5A' },
      { day: 'Day 15', event: 'Second SMS delivered', channel: 'SMS', color: '#185FA5' },
      { day: 'Day 17', event: 'No engagement. Flagged for voice AI.', channel: 'SMS', color: '#5F5E5A' },
    ],
    signals: [],
  },
  {
    id: 'c6',
    accountId: '#APX-4410',
    outcome: 'Dispute',
    amount: null,
    qualityScore: 85,
    channels: ['Voice AI', 'Human'],
    direction: 'Outbound',
    sentiment: 'Negative',
    language: 'English',
    daysAgo: 4,
    summary: 'Voice AI connected. Consumer disputed the debt. Transferred to human agent. Dispute logged, account flagged.',
    transcript: [
      { actor: 'System', text: 'Voice AI call - Connected', ts: '1:45 PM' },
      { actor: 'Voice AI', text: 'Hello, this is Apex Recovery Partners. This is an attempt to collect a debt and any information obtained will be used for that purpose. This call may be recorded for quality assurance. Am I speaking with the account holder?', ts: '1:45 PM' },
      { actor: 'Consumer', text: 'Yes. But I do not owe this. This is not my debt.', ts: '1:46 PM' },
      { actor: 'Voice AI', text: 'I understand you are disputing this account. Let me connect you with a specialist who can assist you further.', ts: '1:46 PM' },
      { actor: 'System', text: 'Channel switch: Voice AI transferred to Human Agent (Dispute queue)', ts: '1:47 PM', isChannelSwitch: true },
      { actor: 'Human', text: 'Hello, my name is James. This is an attempt to collect a debt and any information obtained will be used for that purpose. I understand you believe this is not your debt. I am going to log a formal dispute on your account. We will send you written verification within 30 days as required by the FDCPA. No further collection activity will occur until that verification is complete.', ts: '1:48 PM' },
      { actor: 'Consumer', text: 'Fine. Send me the paperwork.', ts: '1:49 PM' },
      { actor: 'System', text: 'Dispute logged. Account flagged. Verification letter queued.', ts: '1:50 PM' },
    ],
    timeline: [
      { day: 'Day 8', event: 'Voice AI call connected', channel: 'Voice AI', color: '#3B6D11' },
      { day: 'Day 8', event: 'Consumer disputed debt', channel: 'Voice AI', color: '#A32D2D' },
      { day: 'Day 8', event: 'Transferred to human agent', channel: 'Human', color: '#854F0B' },
      { day: 'Day 8', event: 'Dispute logged, account flagged', channel: 'Human', color: '#A32D2D' },
      { day: 'Day 9', event: 'Verification letter queued for mailing', channel: 'Email', color: '#534AB7' },
    ],
    signals: ['Right party contact confirmed', 'Dispute detected', 'Escalation to human'],
  },
  {
    id: 'c7',
    accountId: '#APX-3298',
    outcome: 'No answer',
    amount: null,
    qualityScore: null,
    channels: ['SMS'],
    direction: 'Outbound',
    sentiment: 'Unknown',
    language: 'English',
    daysAgo: 4,
    summary: 'Single SMS sent. Delivered but not opened. No consumer engagement.',
    transcript: [
      { actor: 'System', text: 'SMS campaign message delivered', ts: '11:00 AM' },
      { actor: 'Bot', text: 'Apex Recovery Partners: You have options to resolve your account. Reply INFO for details or call us at the number on your statement.', ts: '11:00 AM' },
      { actor: 'System', text: 'Delivery confirmed. No open or reply after 72 hours.', ts: '11:00 AM +3d' },
    ],
    timeline: [
      { day: 'Day 10', event: 'SMS delivered', channel: 'SMS', color: '#185FA5' },
      { day: 'Day 13', event: 'No engagement after 72 hours', channel: 'SMS', color: '#5F5E5A' },
      { day: 'Day 14', event: 'Account queued for voice AI follow-up', channel: 'Voice AI', color: '#3B6D11' },
    ],
    signals: [],
  },
  {
    id: 'c8',
    accountId: '#APX-6012',
    outcome: 'PTP',
    amount: null,
    qualityScore: 90,
    channels: ['Voice AI', 'Voice AI', 'SMS'],
    direction: 'Outbound',
    sentiment: 'Neutral',
    language: 'English',
    daysAgo: 5,
    summary: 'Two voice AI attempts, first no answer, second connected. SMS reinforcement sent. Consumer promised payment next week.',
    transcript: [
      { actor: 'System', text: 'Voice AI call attempt 1 - No answer', ts: '9:00 AM' },
      { actor: 'System', text: 'Voice AI call attempt 2 - Connected', ts: '3:30 PM +2d' },
      { actor: 'Voice AI', text: 'Hello, this is Apex Recovery Partners. This is an attempt to collect a debt and any information obtained will be used for that purpose. This call may be recorded. Am I speaking with the account holder?', ts: '3:30 PM +2d' },
      { actor: 'Consumer', text: 'Yes. I have been meaning to call you back.', ts: '3:31 PM +2d' },
      { actor: 'Voice AI', text: 'We appreciate that. Your current balance is $3,200. Are you able to make a payment today or would you like to set up a plan?', ts: '3:31 PM +2d' },
      { actor: 'Consumer', text: 'Not right now. I can do something next week when I get paid.', ts: '3:32 PM +2d' },
      { actor: 'Voice AI', text: 'Understood. I will note a promise to pay for next week. We will send you a reminder via text. Thank you for your time.', ts: '3:32 PM +2d' },
      { actor: 'System', text: 'PTP recorded. SMS reminder scheduled.', ts: '3:33 PM +2d' },
    ],
    timeline: [
      { day: 'Day 7', event: 'Voice AI call - no answer', channel: 'Voice AI', color: '#3B6D11' },
      { day: 'Day 9', event: 'Voice AI call - connected', channel: 'Voice AI', color: '#3B6D11' },
      { day: 'Day 9', event: 'Consumer promised to pay next week', channel: 'Voice AI', color: '#185FA5' },
      { day: 'Day 10', event: 'PTP reminder SMS sent', channel: 'SMS', color: '#185FA5' },
    ],
    signals: ['Right party contact confirmed', 'Promise to pay captured'],
  },
  {
    id: 'c9',
    accountId: '#APX-5641',
    outcome: 'Callback',
    amount: null,
    qualityScore: 87,
    channels: ['Voice AI'],
    direction: 'Outbound',
    sentiment: 'Neutral',
    language: 'English',
    daysAgo: 6,
    summary: 'Voice AI connected briefly. Consumer requested callback for Monday. Scheduled and SMS confirmation sent.',
    transcript: [
      { actor: 'System', text: 'Voice AI call - Connected', ts: '4:15 PM' },
      { actor: 'Voice AI', text: 'Hello, this is Apex Recovery Partners. This is an attempt to collect a debt and any information obtained will be used for that purpose. This call may be recorded. Am I speaking with the account holder?', ts: '4:15 PM' },
      { actor: 'Consumer', text: 'Yes but this is not a good time. Can you call me Monday?', ts: '4:15 PM' },
      { actor: 'Voice AI', text: 'Of course. I will schedule a callback for Monday. What time works best?', ts: '4:16 PM' },
      { actor: 'Consumer', text: 'After 10 AM.', ts: '4:16 PM' },
      { actor: 'Voice AI', text: 'Got it. We will call you Monday after 10 AM. You will receive a text confirmation shortly. Have a good evening.', ts: '4:16 PM' },
      { actor: 'System', text: 'Callback scheduled for Monday 10:00 AM. SMS confirmation sent.', ts: '4:17 PM' },
    ],
    timeline: [
      { day: 'Day 6', event: 'Voice AI call connected', channel: 'Voice AI', color: '#3B6D11' },
      { day: 'Day 6', event: 'Consumer requested callback', channel: 'Voice AI', color: '#854F0B' },
      { day: 'Day 6', event: 'Callback scheduled for Monday', channel: 'Voice AI', color: '#854F0B' },
      { day: 'Day 6', event: 'SMS confirmation sent', channel: 'SMS', color: '#185FA5' },
    ],
    signals: ['Right party contact confirmed', 'Callback requested'],
  },
  {
    id: 'c10',
    accountId: '#APX-7234',
    outcome: 'Settled',
    amount: '$3,900',
    qualityScore: 89,
    channels: ['SMS', 'Voice AI', 'Human'],
    direction: 'Outbound',
    sentiment: 'Positive',
    language: 'Spanish',
    daysAgo: 5,
    summary: 'SMS de liquidacion abierto. Llamada de voz AI conectada. Escalado a agente para plan de pago. Liquidado.',
    transcript: [
      { actor: 'System', text: 'SMS campaign (Spanish) delivered', ts: '9:00 AM' },
      { actor: 'Bot', text: 'Apex Recovery Partners: Tiene una oferta de liquidacion disponible en su cuenta. Toque aqui para ver los detalles.', ts: '9:00 AM' },
      { actor: 'System', text: 'Consumer opened SMS and clicked link', ts: '11:30 AM' },
      { actor: 'System', text: 'Channel switch: SMS campaign followed by Voice AI (Spanish)', ts: '2:00 PM +1d', isChannelSwitch: true },
      { actor: 'Voice AI', text: 'Buenos dias, le llamamos de Apex Recovery Partners. Esta es una llamada para cobrar una deuda y cualquier informacion obtenida sera utilizada para ese proposito. Esta llamada puede ser grabada. Estoy hablando con el titular de la cuenta?', ts: '2:00 PM +1d' },
      { actor: 'Consumer', text: 'Si, soy yo. Vi el mensaje. Quiero arreglar esto.', ts: '2:01 PM +1d' },
      { actor: 'Voice AI', text: 'Perfecto. Su saldo es de $3,900 y podemos ofrecerle un descuento del 15%. Eso seria $3,315. Le gustaria hablar con un agente para configurar el plan de pago?', ts: '2:01 PM +1d' },
      { actor: 'Consumer', text: 'Si, por favor.', ts: '2:02 PM +1d' },
      { actor: 'System', text: 'Channel switch: Voice AI transferred to Human Agent (Bilingual)', ts: '2:02 PM +1d', isChannelSwitch: true },
      { actor: 'Human', text: 'Hola, mi nombre es Maria. Esta es una llamada para cobrar una deuda y cualquier informacion obtenida sera utilizada para ese proposito. Voy a ayudarle con el plan de pago. Podemos dividir los $3,315 en tres pagos mensuales de $1,105. Le parece bien?', ts: '2:03 PM +1d' },
      { actor: 'Consumer', text: 'Si, esta bien. Vamos a hacerlo.', ts: '2:04 PM +1d' },
      { actor: 'System', text: 'Payment plan created. Settlement of $3,315 over 3 months.', ts: '2:06 PM +1d' },
    ],
    timeline: [
      { day: 'Day 8', event: 'Spanish SMS campaign delivered', channel: 'SMS', color: '#185FA5' },
      { day: 'Day 8', event: 'Consumer opened SMS, clicked link', channel: 'SMS', color: '#185FA5' },
      { day: 'Day 9', event: 'Voice AI (Spanish) connected', channel: 'Voice AI', color: '#3B6D11' },
      { day: 'Day 9', event: 'Transferred to bilingual agent', channel: 'Human', color: '#854F0B' },
      { day: 'Day 9', event: 'Settlement plan created - $3,315 over 3 months', channel: 'Human', color: '#3B6D11' },
    ],
    signals: ['Right party contact confirmed', 'Settlement accepted', 'Spanish language preference'],
  },
];

// ── Style maps ──────────────────────────────────────────────────────────────

const outcomeBadgeStyles = {
  'Settled': { bg: '#EAF3DE', text: '#3B6D11' },
  'PTP': { bg: '#E6F1FB', text: '#185FA5' },
  'No answer': { bg: '#F1EFE8', text: '#5F5E5A' },
  'Dispute': { bg: '#FCEBEB', text: '#A32D2D' },
  'Callback': { bg: '#FAEEDA', text: '#854F0B' },
};

const channelTagStyles = {
  'Voice AI': { bg: '#EAF3DE', text: '#3B6D11' },
  'SMS': { bg: '#E6F1FB', text: '#185FA5' },
  'Email': { bg: '#EEEDFE', text: '#534AB7' },
  'Human': { bg: '#FAEEDA', text: '#854F0B' },
  'Bot': { bg: '#F1EFE8', text: '#5F5E5A' },
};

// ── Filter definitions ──────────────────────────────────────────────────────

const filterDefs = [
  { key: 'outcome', label: 'Outcome', options: ['Settled', 'PTP', 'No answer', 'Dispute', 'Callback'] },
  { key: 'channel', label: 'Channel', options: ['Voice AI', 'SMS', 'Email', 'Human', 'Bot'] },
  { key: 'direction', label: 'Direction', options: ['Outbound', 'Inbound'] },
  { key: 'sentiment', label: 'Sentiment', options: ['Positive', 'Neutral', 'Negative', 'Unknown'] },
  { key: 'language', label: 'Language', options: ['English', 'Spanish'] },
  { key: 'quality', label: 'Quality', options: ['Scored', 'Unscored'] },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

const OutcomeBadge = ({ outcome }) => {
  const s = outcomeBadgeStyles[outcome] || { bg: '#F1EFE8', text: '#5F5E5A' };
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded"
      style={{ background: s.bg, color: s.text }}
    >
      {outcome}
    </span>
  );
};

const ChannelTag = ({ channel }) => {
  const s = channelTagStyles[channel] || { bg: '#F1EFE8', text: '#5F5E5A' };
  return (
    <span
      className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded"
      style={{ background: s.bg, color: s.text }}
    >
      {channel}
    </span>
  );
};

// ── Filter Dropdown ─────────────────────────────────────────────────────────

const FilterDropdown = ({ label, options, selected, onToggle, isOpen, onOpenToggle }) => {
  const ref = useRef(null);
  const activeCount = selected.length;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onOpenToggle(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onOpenToggle]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => onOpenToggle(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
        style={{
          background: activeCount > 0 ? '#e8f4f1' : '#ffffff',
          border: `1px solid ${activeCount > 0 ? '#2196af' : '#d4eae5'}`,
          color: activeCount > 0 ? '#2196af' : '#6b7280',
        }}
      >
        {label}
        {activeCount > 0 && (
          <span
            className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold text-white"
            style={{ background: '#2196af' }}
          >
            {activeCount}
          </span>
        )}
        <span className="material-symbols-outlined text-sm" style={{ fontSize: '14px' }}>expand_more</span>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg z-30 py-1 min-w-[160px]" style={{ border: '1px solid #d4eae5' }}>
          {options.map(opt => {
            const isActive = selected.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => onToggle(opt)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left hover:bg-gray-50 transition-colors"
              >
                <span
                  className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                  style={{
                    border: `1.5px solid ${isActive ? '#2196af' : '#d4eae5'}`,
                    background: isActive ? '#2196af' : '#ffffff',
                  }}
                >
                  {isActive && (
                    <span className="material-symbols-outlined text-white" style={{ fontSize: '12px' }}>check</span>
                  )}
                </span>
                <span className={isActive ? 'text-gray-900 font-medium' : 'text-gray-600'}>{opt}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── Waveform (mock audio) ───────────────────────────────────────────────────

const MockWaveform = () => {
  const bars = 60;
  return (
    <div className="flex items-end gap-[2px] h-16">
      {Array.from({ length: bars }).map((_, i) => {
        const h = Math.sin(i * 0.3) * 30 + Math.random() * 20 + 10;
        return (
          <div
            key={i}
            className="flex-1 rounded-full"
            style={{
              height: `${Math.max(4, h)}%`,
              background: i < 24 ? '#2196af' : '#d4eae5',
              minWidth: '2px',
            }}
          />
        );
      })}
    </div>
  );
};

// ── Conversation Row ────────────────────────────────────────────────────────

const ConversationRow = ({ conv, isSelected, onClick, compact }) => {
  const uniqueChannels = [...new Set(conv.channels)];
  return (
    <button
      onClick={onClick}
      className="w-full text-left transition-all"
      style={{
        padding: compact ? '12px 16px' : '14px 20px',
        background: isSelected ? '#e8f4f1' : '#ffffff',
        borderLeft: isSelected ? '3px solid #2196af' : '3px solid transparent',
        borderBottom: '1px solid #ecf6f3',
      }}
      onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = '#f0f8f6'; }}
      onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = '#ffffff'; }}
    >
      {/* Row 1: ID, outcome, amount, quality, age */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'monospace' }}>{conv.accountId}</span>
          <OutcomeBadge outcome={conv.outcome} />
          {conv.outcome === 'Settled' && conv.amount && (
            <span className="text-sm font-semibold text-gray-900" style={{ fontVariantNumeric: 'tabular-nums' }}>{conv.amount}</span>
          )}
          {conv.qualityScore && (
            <span className="text-[11px] text-gray-400" style={{ fontVariantNumeric: 'tabular-nums' }}>Q:{conv.qualityScore}</span>
          )}
        </div>
        <span className="text-[11px] text-gray-400 flex-shrink-0" style={{ fontFamily: 'monospace' }}>{conv.daysAgo}d ago</span>
      </div>

      {/* Row 2: Channel pills, direction, language */}
      <div className="flex items-center gap-1.5 mb-1.5">
        {uniqueChannels.map((ch, i) => (
          <ChannelTag key={i} channel={ch} />
        ))}
        <span className="text-[10px] text-gray-400 ml-1">{conv.direction}</span>
        {conv.language !== 'English' && (
          <span className="text-[10px] text-gray-400 ml-1">/ {conv.language}</span>
        )}
      </div>

      {/* Row 3: Summary */}
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-1">{conv.summary}</p>
    </button>
  );
};

// ── Detail Panel ────────────────────────────────────────────────────────────

const DetailPanel = ({ conv, onClose }) => {
  const [detailTab, setDetailTab] = useState('transcript');
  const [actionFeedback, setActionFeedback] = useState(null);
  const hasVoice = conv.channels.includes('Voice AI');

  const handleAction = (action) => {
    setActionFeedback(action);
    setTimeout(() => setActionFeedback(null), 2000);
  };

  const tabs = [
    { id: 'transcript', label: 'Transcript' },
    ...(hasVoice ? [{ id: 'audio', label: 'Audio' }] : []),
    { id: 'timeline', label: 'Account Timeline' },
  ];

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden" style={{ borderLeft: '1px solid #d4eae5' }}>
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4" style={{ borderBottom: '1px solid #d4eae5' }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-gray-900" style={{ fontFamily: 'monospace' }}>{conv.accountId}</span>
            <OutcomeBadge outcome={conv.outcome} />
            {conv.outcome === 'Settled' && conv.amount && (
              <span className="text-sm font-semibold text-gray-900" style={{ fontVariantNumeric: 'tabular-nums' }}>{conv.amount}</span>
            )}
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
          </button>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">{conv.summary}</p>

        {/* Action buttons */}
        <div className="flex gap-2">
          {[
            { id: 'flag', icon: 'flag', label: 'Flag' },
            { id: 'escalate', icon: 'arrow_upward', label: 'Escalate' },
            { id: 'note', icon: 'edit_note', label: 'Add note' },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => handleAction(btn.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all"
              style={{
                background: actionFeedback === btn.id ? '#e8f4f1' : '#ffffff',
                border: `1px solid ${actionFeedback === btn.id ? '#2196af' : '#d4eae5'}`,
                color: actionFeedback === btn.id ? '#2196af' : '#6b7280',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{btn.icon}</span>
              {actionFeedback === btn.id ? 'Done' : btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-shrink-0 flex items-center gap-6 px-6 pt-3" style={{ borderBottom: '1px solid #d4eae5' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setDetailTab(tab.id)}
            className={`pb-3 text-xs font-medium transition-all relative ${detailTab === tab.id ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {tab.label}
            {detailTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full" style={{ background: '#2196af' }} />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">

        {/* Transcript tab */}
        {detailTab === 'transcript' && (
          <div className="p-5 space-y-3">
            {conv.transcript.map((msg, i) => {
              // Channel switch banner
              if (msg.isChannelSwitch) {
                return (
                  <div key={i} className="flex items-center gap-3 py-3">
                    <div className="flex-1 h-px" style={{ background: '#d4eae5' }} />
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold" style={{ background: '#e8f4f1', color: '#2196af', border: '1px solid #d4eae5' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 12 }}>swap_horiz</span>
                      {msg.text.replace('Channel switch: ', '')}
                    </span>
                    <div className="flex-1 h-px" style={{ background: '#d4eae5' }} />
                  </div>
                );
              }
              // System event
              if (msg.actor === 'System') {
                return (
                  <div key={i} className="text-center py-2">
                    <span className="text-[10px] text-gray-400 italic">{msg.text}</span>
                    <span className="text-[9px] text-gray-300 ml-2" style={{ fontFamily: 'monospace' }}>{msg.ts}</span>
                  </div>
                );
              }
              const isConsumer = msg.actor === 'Consumer';
              const actorColor = { 'Voice AI': '#3B6D11', 'SMS': '#185FA5', 'Email': '#534AB7', 'Human': '#854F0B', 'Bot': '#5F5E5A', 'Consumer': '#6B7280' }[msg.actor] || '#6B7280';
              return (
                <div key={i} className={`flex ${isConsumer ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${isConsumer ? 'items-end' : 'items-start'}`}>
                    <div className={`flex items-center gap-2 mb-0.5 ${isConsumer ? 'justify-end' : 'justify-start'}`}>
                      {!isConsumer && <span className="text-[10px] font-bold" style={{ color: actorColor }}>{msg.actor}</span>}
                      <span className="text-[9px] text-gray-300" style={{ fontFamily: 'monospace' }}>{msg.ts}</span>
                      {isConsumer && <span className="text-[10px] font-semibold text-gray-400">Consumer</span>}
                    </div>
                    <div
                      className="px-3.5 py-2.5 rounded-xl text-[13px] leading-relaxed"
                      style={{
                        background: isConsumer ? '#EEF4FB' : '#FAFAF8',
                        color: '#374151',
                        borderBottomRightRadius: isConsumer ? '4px' : '12px',
                        borderBottomLeftRadius: isConsumer ? '12px' : '4px',
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Audio tab */}
        {detailTab === 'audio' && (
          <div className="p-5 space-y-5">
            {/* Waveform */}
            <div className="card p-4">
              <MockWaveform />
              <div className="flex items-center gap-3 mt-3">
                <button
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: '#2196af', color: '#ffffff' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>play_arrow</span>
                </button>
                <div className="flex-1">
                  <div className="h-1.5 rounded-full" style={{ background: '#d4eae5' }}>
                    <div className="h-1.5 rounded-full" style={{ background: '#2196af', width: '40%' }} />
                  </div>
                </div>
                <span className="text-[11px] text-gray-400" style={{ fontFamily: 'monospace' }}>1:24 / 3:32</span>
              </div>
            </div>

            {/* Detected signals */}
            {conv.signals.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Detected Signals</h4>
                <div className="flex flex-wrap gap-2">
                  {conv.signals.map((sig, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium"
                      style={{ background: '#e8f4f1', color: '#2196af', border: '1px solid #d4eae5' }}
                    >
                      {sig}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quality score */}
            {conv.qualityScore && (
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Quality Score</h4>
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall</span>
                    <span className="text-lg font-bold" style={{ color: conv.qualityScore >= 90 ? '#3B6D11' : conv.qualityScore >= 80 ? '#854F0B' : '#A32D2D' }}>
                      {conv.qualityScore}/100
                    </span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: '#d4eae5' }}>
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${conv.qualityScore}%`,
                        background: conv.qualityScore >= 90 ? '#61ab5e' : conv.qualityScore >= 80 ? '#d4a017' : '#A32D2D',
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Timeline tab */}
        {detailTab === 'timeline' && (
          <div className="p-5">
            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5" style={{ background: '#d4eae5' }} />

              {conv.timeline.map((event, i) => {
                const prevDay = i > 0 ? conv.timeline[i - 1].day : null;
                const showDayLabel = event.day !== prevDay;
                return (
                  <div key={i} className="relative mb-4">
                    {/* Dot */}
                    <div
                      className="absolute -left-[17px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white"
                      style={{ background: event.color, boxShadow: '0 0 0 2px #d4eae5' }}
                    />
                    {/* Content */}
                    <div>
                      {showDayLabel && (
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{event.day}</span>
                      )}
                      <div className="flex items-center gap-2 mt-0.5">
                        <ChannelTag channel={event.channel} />
                        <span className="text-xs text-gray-700">{event.event}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Main Component ──────────────────────────────────────────────────────────

export default function Conversations() {
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    outcome: [],
    channel: [],
    direction: [],
    sentiment: [],
    language: [],
    quality: [],
  });
  const [openFilter, setOpenFilter] = useState(null);

  // Escape key handler
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Toggle a filter value
  const toggleFilter = useCallback((key, value) => {
    setFilters(prev => {
      const current = prev[key];
      const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
      return { ...prev, [key]: next };
    });
  }, []);

  // Clear all filters
  const clearAll = useCallback(() => {
    setFilters({ outcome: [], channel: [], direction: [], sentiment: [], language: [], quality: [] });
    setSearchQuery('');
  }, []);

  // Count active filters
  const activeFilterCount = Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);

  // Active filter chips
  const activeChips = [];
  for (const [key, values] of Object.entries(filters)) {
    for (const val of values) {
      activeChips.push({ key, val });
    }
  }

  // Filter conversations
  const filtered = conversations.filter(conv => {
    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!conv.accountId.toLowerCase().includes(q) && !conv.summary.toLowerCase().includes(q)) return false;
    }
    // Outcome
    if (filters.outcome.length > 0 && !filters.outcome.includes(conv.outcome)) return false;
    // Channel
    if (filters.channel.length > 0 && !filters.channel.some(ch => conv.channels.includes(ch))) return false;
    // Direction
    if (filters.direction.length > 0 && !filters.direction.includes(conv.direction)) return false;
    // Sentiment
    if (filters.sentiment.length > 0 && !filters.sentiment.includes(conv.sentiment)) return false;
    // Language
    if (filters.language.length > 0 && !filters.language.includes(conv.language)) return false;
    // Quality
    if (filters.quality.length > 0) {
      const hasScore = conv.qualityScore !== null;
      if (filters.quality.includes('Scored') && !filters.quality.includes('Unscored') && !hasScore) return false;
      if (filters.quality.includes('Unscored') && !filters.quality.includes('Scored') && hasScore) return false;
    }
    return true;
  });

  const selectedConv = conversations.find(c => c.id === selectedId);

  return (
    <div className="p-8 h-full" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="mb-3 flex-shrink-0 flex items-center gap-3">
        <h1 className="text-xl font-bold text-gray-900 flex-shrink-0">Conversations</h1>
        <div className="flex-1" />
        <div className="relative flex-shrink-0" style={{ width: '240px' }}>
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: '16px' }}>search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by account ID, keyword, or transcript phrase..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs text-gray-700 placeholder-gray-400 focus:outline-none transition-all"
            style={{ background: '#ffffff', border: '1px solid #d4eae5' }}
            onFocus={(e) => { e.target.style.borderColor = '#2196af'; e.target.style.boxShadow = '0 0 0 2px rgba(33,150,175,0.1)'; }}
            onBlur={(e) => { e.target.style.borderColor = '#d4eae5'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
      </div>

      {/* Filter row */}
      <div className="mb-2 flex-shrink-0 flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-400 font-medium flex-shrink-0">Filter by</span>
        {filterDefs.map(fd => (
          <FilterDropdown
            key={fd.key}
            label={fd.label}
            options={fd.options}
            selected={filters[fd.key]}
            onToggle={(val) => toggleFilter(fd.key, val)}
            isOpen={openFilter === fd.key}
            onOpenToggle={(open) => setOpenFilter(open ? fd.key : null)}
          />
        ))}
        {activeFilterCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs font-medium flex-shrink-0 transition-colors"
            style={{ color: '#2196af' }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active filter chips */}
      {activeChips.length > 0 && (
        <div className="mb-3 flex-shrink-0 flex items-center gap-1.5 flex-wrap">
          {activeChips.map(chip => (
            <span
              key={`${chip.key}-${chip.val}`}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium"
              style={{ background: '#e8f4f1', color: '#2196af', border: '1px solid #d4eae5' }}
            >
              {chip.val}
              <button
                onClick={() => toggleFilter(chip.key, chip.val)}
                className="hover:opacity-70 transition-opacity"
                style={{ color: '#2196af' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>close</span>
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex gap-0 min-h-0 card overflow-hidden" style={{ marginTop: '4px' }}>
        {/* Conversation list */}
        <div
          className="flex-shrink-0 overflow-y-auto"
          style={{
            width: selectedId ? '55%' : '100%',
            transition: 'width 0.25s ease-in-out',
            borderRight: selectedId ? '1px solid #d4eae5' : 'none',
          }}
        >
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="material-symbols-outlined text-gray-300 mb-2" style={{ fontSize: '36px' }}>search_off</span>
              <p className="text-sm text-gray-400">No conversations match your filters.</p>
              <button onClick={clearAll} className="text-xs font-medium mt-2" style={{ color: '#2196af' }}>Clear all filters</button>
            </div>
          ) : (
            filtered.map(conv => (
              <ConversationRow
                key={conv.id}
                conv={conv}
                isSelected={selectedId === conv.id}
                onClick={() => setSelectedId(selectedId === conv.id ? null : conv.id)}
                compact={!!selectedId}
              />
            ))
          )}
        </div>

        {/* Detail panel */}
        {selectedConv && (
          <div
            className="min-w-0"
            style={{
              width: '45%',
              animation: 'fadeIn 0.25s ease-out',
            }}
          >
            <DetailPanel
              key={selectedConv.id}
              conv={selectedConv}
              onClose={() => setSelectedId(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
