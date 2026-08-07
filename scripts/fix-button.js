const fs = require('fs');
let c = fs.readFileSync('src/components/pages/WizardPage.tsx', 'utf8');
const lines = c.split('\n');

// Replace lines 654-685 (0-indexed: 653-684)
const newLines = [
  '',
  '                      {/* Generate / WhatsApp Button */}',
  '                      <div className="pt-4">',
  '                        <Button',
  '                          className={isVisitor',
  '                            ? "w-full bg-[#25D366] text-white font-semibold hover:bg-[#20BD5A] shadow-lg shadow-[#25D366]/20"',
  '                            : "w-full bg-[#C9A94E] text-[#0A1628] font-semibold hover:bg-[#D4BA6A] shadow-lg shadow-[#C9A94E]/20"}',
  '                          size="lg"',
  '                          onClick={isVisitor ? handleVisitorSubmit : generateDocument}',
  '                          disabled={!isVisitor && generating}',
  '                        >',
  '                          {generating ? (',
  '                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-[#0A1628] border-t-transparent" />',
  '                          ) : isVisitor ? (',
  '                            <MessageCircle className="mr-2 h-5 w-5" />',
  '                          ) : (',
  '                            <FileText className="mr-2 h-5 w-5" />',
  '                          )}',
  '                          {generating ? "Generando..." : isVisitor ? "Enviar por WhatsApp" : "Generar Documento"}',
  '                        </Button>',
  '                      </div>',
];

lines.splice(653, 32, ...newLines);
fs.writeFileSync('src/components/pages/WizardPage.tsx', lines.join('\n'));
console.log('Done - replaced 32 lines with', newLines.length, 'lines');
