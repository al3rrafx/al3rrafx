// ملف الـ routes - يمكنك إضافة API routes هنا لاحقاً
const routes = {
    '/api/zodiac': (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Zodiac API endpoint' }));
    },
    '/api/compatibility': (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Compatibility API endpoint' }));
    }
};

module.exports = routes;