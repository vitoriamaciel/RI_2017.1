package crawler;

public class Tester {
	
	public static void main(String[] args){
        Spider spider = new Spider();
        spider.search("https://www.evino.com.br/vinhos/", "computer");
        
        Arquivo arquivo = new Arquivo("saida.txt");
        arquivo.escrever(spider.saida);
        //System.out.println(spider.saida);
        
        arquivo.fechar();
    }


}
