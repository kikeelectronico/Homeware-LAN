from fastapi.responses import JSONResponse

FOUR_O_ONE = JSONResponse(status_code=404,
                            content = {
                                "error": "Bad authentication",
                                "code": 401,
                                "note": "See the documentation https://homeware.enriquegomez.me/api-docs.html"
                            })

FOUR_O_FOUR = JSONResponse(status_code=404,
                            content = {
                                "error": "Not found",
                                "code": 404,
                                "note": "See the documentation https://homeware.enriquegomez.me/"
                            })
                            
FOUR_O_O = JSONResponse(status_code=404,
                            content = {
                                "error": "Operation not supported",
                                "code": 400,
                                "note": "See the documentation https://homeware.enriquegomez.me/"
                            })

TWO_O_O = {
    'status': 'Success',
    'code': 200
}

