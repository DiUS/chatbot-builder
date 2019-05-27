withIntent('WhatsUp', () => {
  utterance('what\'s up');
  responseMessage(`<p>The usual, life's good for a bot.</p><p>What can I help you with?</p>`);
  responseCard()
    .withLink({
      title: 'More info',
      attachmentLinkUrl: 'https: //my.donateblood.com.au/app/answers/detail/a_id/10',
      subTitle: 'faqOverseasTravelMoreInfoLinkClicked'
    })
    .withButton('Am I eligible?')
    .withButton('Book Appointment');
});
