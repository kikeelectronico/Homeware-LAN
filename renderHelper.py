class RenderHelper:

    basic = {}

    def __init__(self):

        headFile = open('templates/panel/components/head.html', 'r')
        self.basic['head'] = headFile.read()

        navbarFile = open('templates/panel/components/navbar.html', 'r')
        self.basic['navbar'] = navbarFile.read()
