package br.com.cq.dominio;

import java.util.List;

import org.joda.time.DateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
@Document
public class Revisao {
	
	@Id
	private String id;
	private List<Questao> questoes;
	private Integer totalQuestoes;
	private Integer totalAcertos;
	private Integer totalErros;
	private Integer porcentagemAcertos;
	private Integer passo;
	private boolean concluido;
	private DateTime dataCriacao;

}
